# /// script
# requires-python = ">=3.11"
# dependencies = ["reportlab==4.4.9"]
# ///

"""Generate the portfolio resume PDF served from public/.

Run from the repository root with:
    uv run scripts/generate_resume.py
or:
    npm run resume
"""

from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "vinicius-romualdo-resume.pdf"

INK = colors.HexColor("#111522")
MUTED = colors.HexColor("#596274")
BLUE = colors.HexColor("#245BFF")
PALE_BLUE = colors.HexColor("#F2F6FF")
HAIRLINE = colors.HexColor("#D7DEEA")

PAGE_W, PAGE_H = A4
LEFT = RIGHT = 14 * mm
TOP = BOTTOM = 12 * mm


def duration_since(year: int, month: int) -> str:
    """Return a current, human-readable duration from a 1-based month."""
    today = date.today()
    total_months = max(0, (today.year - year) * 12 + today.month - month)
    years, months = divmod(total_months, 12)
    parts = []
    if years:
        parts.append(f"{years} year{'s' if years != 1 else ''}")
    if months:
        parts.append(f"{months} month{'s' if months != 1 else ''}")
    return " ".join(parts) or "0 months"


def ensure_ascii_hyphens(text: str) -> None:
    forbidden = "\u2010\u2011\u2012\u2013\u2014\u2212"
    if any(character in text for character in forbidden):
        raise ValueError("Resume content must use ASCII hyphens only")


styles = getSampleStyleSheet()
name_style = ParagraphStyle(
    "Name",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=21,
    leading=23,
    textColor=INK,
    spaceAfter=2,
)
headline_style = ParagraphStyle(
    "Headline",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.8,
    leading=10.2,
    tracking=0.45,
    textColor=BLUE,
    spaceAfter=4,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.6,
    leading=9.2,
    textColor=MUTED,
    spaceAfter=6,
)
section_style = ParagraphStyle(
    "Section",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.6,
    leading=10.2,
    tracking=0.35,
    textColor=BLUE,
    spaceBefore=5.5,
    spaceAfter=2.5,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=7.8,
    leading=9.55,
    textColor=INK,
    alignment=TA_LEFT,
    spaceAfter=2,
)
small_style = ParagraphStyle(
    "Small",
    parent=body_style,
    fontSize=7.35,
    leading=8.8,
)
company_style = ParagraphStyle(
    "Company",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=9.35,
    leading=10.8,
    textColor=INK,
    spaceBefore=2.5,
    spaceAfter=0.5,
)
role_style = ParagraphStyle(
    "Role",
    parent=body_style,
    fontName="Helvetica-Bold",
    fontSize=8.05,
    leading=9.5,
    textColor=INK,
    spaceAfter=1.5,
)
bullet_style = ParagraphStyle(
    "Bullet",
    parent=body_style,
    leftIndent=10,
    bulletIndent=1,
    spaceAfter=1.25,
)
skill_style = ParagraphStyle(
    "Skill",
    parent=body_style,
    fontSize=7.45,
    leading=9.0,
    spaceAfter=0,
)


def section(title: str):
    return [
        Paragraph(title.upper(), section_style),
        HRFlowable(width="100%", thickness=0.55, color=HAIRLINE, spaceAfter=3),
    ]


def bullet(text: str):
    return Paragraph(text, bullet_style, bulletText="•")


def role(title: str, dates: str, location: str = "Brazil"):
    return Paragraph(
        f"{title} <font name='Helvetica' color='#596274'>| {dates} | {location}</font>",
        role_style,
    )


def skill_box(rows: list[str]):
    data = [[Paragraph(row, skill_style)] for row in rows]
    table = Table(data, colWidths=[PAGE_W - LEFT - RIGHT - 8], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALE_BLUE),
                ("BOX", (0, 0), (-1, -1), 0.5, HAIRLINE),
                ("LINEBEFORE", (0, 0), (0, -1), 2.2, BLUE),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, 0), 4.5),
                ("BOTTOMPADDING", (0, -1), (-1, -1), 4.5),
                ("TOPPADDING", (0, 1), (-1, -1), 1.2),
                ("BOTTOMPADDING", (0, 0), (-1, -2), 1.2),
            ]
        )
    )
    return table


class ResumeDocTemplate(BaseDocTemplate):
    def __init__(self, filename: str):
        super().__init__(
            filename,
            pagesize=A4,
            leftMargin=LEFT,
            rightMargin=RIGHT,
            topMargin=TOP,
            bottomMargin=BOTTOM,
            title="Vinícius Romualdo - Full-stack Software Engineer Resume",
            author="Vinícius Romualdo",
            subject=(
                "Full-stack Software Engineer resume focused on software systems, "
                "distributed architectures, applied AI, and Model Context Protocol"
            ),
            keywords=(
                "Full-stack Software Engineer, Full Stack Engineer, Frontend Development, Backend, "
                "Software Architecture, Distributed Systems, Artificial Intelligence, Applied AI, "
                "Generative AI, Model Context Protocol, MCP, MCP servers, AI Automation, "
                "Developer Tooling, Web Platforms, React, Next.js, TypeScript, Go, Kotlin, Kubernetes"
            ),
        )
        frame = Frame(
            LEFT,
            BOTTOM + 5 * mm,
            PAGE_W - LEFT - RIGHT,
            PAGE_H - TOP - BOTTOM - 5 * mm,
            leftPadding=0,
            rightPadding=0,
            topPadding=0,
            bottomPadding=0,
        )
        self.addPageTemplates(
            PageTemplate(id="resume", frames=[frame], onPage=self.draw_footer)
        )

    @staticmethod
    def draw_footer(canvas, doc):
        canvas.saveState()
        canvas.setStrokeColor(HAIRLINE)
        canvas.setLineWidth(0.45)
        canvas.line(LEFT, 10.5 * mm, PAGE_W - RIGHT, 10.5 * mm)
        canvas.setFont("Helvetica", 7)
        canvas.setFillColor(MUTED)
        canvas.drawString(LEFT, 6.5 * mm, "viniromualdo.com")
        label = f"Page {doc.page}"
        canvas.drawString(
            PAGE_W - RIGHT - stringWidth(label, "Helvetica", 7), 6.5 * mm, label
        )
        canvas.restoreState()


def build_story():
    ifood_total = duration_since(2024, 3)
    engineer_duration = duration_since(2024, 11)
    story = [
        Paragraph("Vinícius Romualdo", name_style),
        Paragraph(
            "FULL-STACK SOFTWARE ENGINEER | SOFTWARE ARCHITECTURE | DISTRIBUTED SYSTEMS | APPLIED AI",
            headline_style,
        ),
        Paragraph(
            "São Carlos, Brazil | "
            "<link href='mailto:viniciusromualdobusiness@gmail.com' color='#245BFF'>viniciusromualdobusiness@gmail.com</link> | "
            "<link href='https://viniromualdo.com' color='#245BFF'>viniromualdo.com</link> | "
            "<link href='https://www.linkedin.com/in/vinimrs/' color='#245BFF'>linkedin.com/in/vinimrs</link> | "
            "<link href='https://github.com/vinimrs' color='#245BFF'>github.com/vinimrs</link>",
            contact_style,
        ),
        *section("Professional Summary"),
        Paragraph(
            "Full-stack Software Engineer with <b>2+ years at iFood</b>, focused on product engineering, "
            "distributed systems, reliability, and applied AI. M.Sc. candidate at USP. Builds web platforms, "
            "event-driven services, and internal AI tools that turn fragmented context into guided action. "
            "Experienced across frontend, backend, software architecture, and production delivery. "
            "Open to remote and international projects.",
            body_style,
        ),
        *section("Technical Skills"),
        skill_box(
            [
                "<b>AI Engineering:</b> Artificial Intelligence (AI), Applied AI, Generative AI, Model Context Protocol (MCP), MCP servers, AI-assisted automation, context aggregation, tool orchestration, workflow automation, developer tooling",
                "<b>Systems Architecture:</b> Microservices, distributed systems, event-driven architecture, REST APIs, CQRS, Domain-Driven Design (DDD), asynchronous communication, idempotency, reconciliation",
                "<b>Full-stack Engineering:</b> Go, Kotlin, TypeScript, NestJS, Next.js, React, REST APIs, web platforms",
                "<b>Data and Messaging:</b> PostgreSQL, Kafka, Amazon SQS, service integrations, data modeling",
                "<b>Platform and Reliability:</b> Kubernetes, Docker, CI/CD, cloud computing, observability, monitoring, alerting, production reliability, service decommissioning",
                "<b>Research:</b> Self-adaptive systems, MAPE-K, self-protection, self-healing, microservice security, adaptive security",
            ]
        ),
        *section("Professional Experience"),
        KeepTogether(
            [
                Paragraph(
                    f"iFood <font name='Helvetica' color='#596274'>| Mar 2024 - Present | {ifood_total} total</font>",
                    company_style,
                ),
                role(
                    "Software Engineer",
                    f"Nov 2024 - Present ({engineer_duration})",
                ),
                bullet(
                    "<b>AI-assisted service decommissioning:</b> Developed an internal tool that replaced a long process with multiple manual and delicate steps with a structured, guided workflow."
                ),
                bullet(
                    "<b>Model Context Protocol:</b> Connected MCP servers to multiple internal systems to aggregate service ownership, dependencies, runtime signals, and operational context into a unified view and actionable decommissioning plan."
                ),
                bullet(
                    "<b>Pix platform:</b> Led backend development of a Pix Key Management platform, covering architecture, data modeling, provider integrations, infrastructure provisioning, asynchronous communication, idempotency, and reconciliation."
                ),
                bullet(
                    "<b>Legacy modernization:</b> Refactored legacy services into RESTful and event-driven architectures, improving separation of responsibilities, scalability, security, observability, and migration safety."
                ),
                bullet(
                    "<b>Developer platform:</b> Created and maintained the team's first shared backend library to standardize audit records, reduce duplicated implementation, and improve developer experience across services."
                ),
                bullet(
                    "<b>Production reliability:</b> Improved monitoring, alerting, proactive error handling, and architecture discovery for new financial domains and integration strategies."
                ),
                role("Software Engineer Intern", "Mar 2024 - Nov 2024 (9 months)"),
                bullet(
                    "Built and evolved back-office products for iFood Pago while contributing to a new architecture and maintaining the team's first shared code library."
                ),
                bullet(
                    "Developed an AI-integrated backend during an internal Generative AI hackathon using Go, NestJS, and Kotlin."
                ),
            ]
        ),
        *section("Research Experience"),
        KeepTogether(
            [
                Paragraph("Scientific Researcher | FAPESP", company_style),
                role(
                    "Research Fellow",
                    "Mar 2023 - Mar 2024 (1 year 1 month)",
                    "São Carlos, Brazil",
                ),
                bullet(
                    "Designed and developed a web platform supporting research on mental health and substance use disorder rehabilitation using Next.js, TypeScript, and CSS."
                ),
                bullet(
                    "Defined system architecture, maintained engineering practices, and provisioned CI/CD workflows for reliable integration and deployment."
                ),
            ]
        ),
        KeepTogether(
            [
                Paragraph("Federal University of São Carlos (UFSCar)", company_style),
                role(
                    "Scientific Researcher",
                    "Mar 2022 - Mar 2023 (1 year 1 month)",
                    "São Carlos, Brazil",
                ),
                bullet(
                    "Developed the initial research platform and integrated conversational-agent experiences with supporting systems for rehabilitation research."
                ),
            ]
        ),
        *section("Education and Research Focus"),
        KeepTogether(
            [
                Paragraph(
                    "M.Sc. in Computer Science | University of São Paulo (USP)",
                    company_style,
                ),
                role(
                    "Graduate Research",
                    "Mar 2025 - Mar 2027 (expected)",
                    "São Carlos, Brazil",
                ),
                Paragraph(
                    "Research focus: self-adaptive security for microservices, connecting attack detection, self-protection, self-healing, MAPE-K feedback loops, safe automation, and recovery strategies. Architecture paper accepted at AISecDev 2026; experiment in progress.",
                    body_style,
                ),
            ]
        ),
        KeepTogether(
            [
                Paragraph(
                    "B.Sc. in Computer Science | Federal University of São Carlos (UFSCar)",
                    company_style,
                ),
                role(
                    "Undergraduate Degree",
                    "Jan 2021 - Apr 2025",
                    "São Carlos, Brazil",
                ),
            ]
        ),
        *section("Technical Focus"),
        Paragraph(
            "Full-stack engineering; web platforms; React; Next.js; TypeScript; AI-assisted service decommissioning; Model Context Protocol; MCP servers; applied AI; Generative AI; developer tooling; workflow automation; distributed systems; event-driven architecture; microservices; legacy modernization; service integration; observability; production reliability; adaptive security.",
            small_style,
        ),
        *section("Certifications"),
        Paragraph(
            "Certified Professional Software Architecture - Foundation Level | Foundations of Cybersecurity | Introduction to Containers with Docker, Kubernetes, and OpenShift",
            body_style,
        ),
    ]
    return story


def main() -> None:
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    story = build_story()
    ensure_ascii_hyphens(Path(__file__).read_text(encoding="utf-8"))
    ResumeDocTemplate(str(OUTPUT)).build(story)
    print(f"Generated {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
