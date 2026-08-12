#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
توليد ملفات PDF تعليمية حقيقية لمنصة تكنولوجيا المباني الذكية
"""

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import os

# تسجيل الخطوط العربية
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
pdfmetrics.registerFont(TTFont('Times New Roman', '/usr/share/fonts/truetype/english/Times-New-Roman.ttf'))
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')
registerFontFamily('Times New Roman', normal='Times New Roman', bold='Times New Roman')

# ألوان موحدة
HEADER_COLOR = colors.HexColor('#1F4E79')
ROW_EVEN = colors.white
ROW_ODD = colors.HexColor('#F5F5F5')

def create_styles():
    """إنشاء أنماط النص"""
    styles = getSampleStyleSheet()
    
    # عنوان رئيسي
    styles.add(ParagraphStyle(
        name='ArabicTitle',
        fontName='SimHei',
        fontSize=24,
        leading=32,
        alignment=TA_CENTER,
        spaceAfter=20,
        textColor=HEADER_COLOR
    ))
    
    # عنوان فرعي
    styles.add(ParagraphStyle(
        name='ArabicHeading',
        fontName='SimHei',
        fontSize=16,
        leading=22,
        alignment=TA_RIGHT,
        spaceBefore=15,
        spaceAfter=10,
        textColor=HEADER_COLOR
    ))
    
    # نص عادي
    styles.add(ParagraphStyle(
        name='ArabicBody',
        fontName='SimHei',
        fontSize=11,
        leading=18,
        alignment=TA_RIGHT,
        spaceAfter=8,
        wordWrap='CJK'
    ))
    
    # نص صغير
    styles.add(ParagraphStyle(
        name='ArabicSmall',
        fontName='SimHei',
        fontSize=9,
        leading=14,
        alignment=TA_RIGHT,
        spaceAfter=6,
        wordWrap='CJK'
    ))
    
    # عنوان جدول
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='SimHei',
        fontSize=10,
        leading=14,
        alignment=TA_CENTER,
        textColor=colors.white
    ))
    
    # خلية جدول
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='SimHei',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        wordWrap='CJK'
    ))
    
    return styles

def create_pdf(filename, title, subtitle, sections):
    """إنشاء ملف PDF"""
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
        title=os.path.basename(filename).replace('.pdf', ''),
        author='Z.ai',
        creator='Z.ai',
        subject=title
    )
    
    styles = create_styles()
    story = []
    
    # صفحة العنوان
    story.append(Spacer(1, 3*cm))
    story.append(Paragraph(title, styles['ArabicTitle']))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph(subtitle, styles['ArabicHeading']))
    story.append(Spacer(1, 2*cm))
    story.append(Paragraph("الصف الثاني عشر صناعي", styles['ArabicBody']))
    story.append(Paragraph("وزارة التربية والتعليم العالي - فلسطين", styles['ArabicBody']))
    story.append(Paragraph("الفصل الدراسي الثاني 2024-2025", styles['ArabicBody']))
    story.append(PageBreak())
    
    # المحتوى
    for section in sections:
        story.append(Paragraph(section['title'], styles['ArabicHeading']))
        
        if 'content' in section:
            for para in section['content']:
                story.append(Paragraph(para, styles['ArabicBody']))
        
        if 'table' in section:
            table_data = []
            # Header
            header_row = [Paragraph(h, styles['TableHeader']) for h in section['table']['headers']]
            table_data.append(header_row)
            
            # Data
            for row in section['table']['data']:
                data_row = [Paragraph(cell, styles['TableCell']) for cell in row]
                table_data.append(data_row)
            
            t = Table(table_data, colWidths=section['table'].get('widths', None))
            t.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), HEADER_COLOR),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('FONTNAME', (0, 0), (-1, -1), 'SimHei'),
                ('FONTSIZE', (0, 0), (-1, 0), 10),
                ('FONTSIZE', (0, 1), (-1, -1), 9),
                ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [ROW_EVEN, ROW_ODD]),
                ('TOPPADDING', (0, 0), (-1, -1), 8),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
            ]))
            story.append(t)
            story.append(Spacer(1, 0.5*cm))
        
        story.append(Spacer(1, 0.5*cm))
    
    doc.build(story)
    print(f"Created: {filename}")

def main():
    output_dir = "/home/z/my-project/public/downloads"
    os.makedirs(output_dir, exist_ok=True)
    
    # ====== الوحدة الأولى: كاميرات المراقبة ======
    cctv_sections = [
        {
            'title': 'مقدمة في أنظمة كاميرات المراقبة (CCTV)',
            'content': [
                'تعتبر أنظمة كاميرات المراقبة من أهم مكونات الأمن والسلامة في المباني الذكية. تمكن هذه الأنظمة من مراقبة ومراقبة المنشآت على مدار الساعة.',
                'تتكون أنظمة المراقبة من عدة مكونات رئيسية: الكاميرات، أجهزة التسجيل (DVR/NVR)، شاشات العرض، ووسائط النقل.',
            ]
        },
        {
            'title': 'أنواع الكاميرات',
            'table': {
                'headers': ['النوع', 'المميزات', 'الاستخدام'],
                'data': [
                    ['كاميرا Dome', 'تصميم دائري، مقاومة للتخريب', 'المصالح الحكومية'],
                    ['كاميرا Bullet', 'مدى بعيد، سهولة التركيب', 'الحدود والأسوار'],
                    ['كاميرا PTZ', 'تحريك 360°، تقريب بصري', 'المواقف الكبيرة'],
                    ['كاميرا IP', 'جودة عالية HD، اتصال شبكي', 'المباني الذكية'],
                ]
            }
        },
        {
            'title': 'خطوات تركيب الكاميرات',
            'content': [
                '1. تحديد مواقع الكاميرات وفق دراسة أمنية شاملة',
                '2. تركيب الحامل وتثبيت الكاميرا بإحكام',
                '3. تمديد الكابلات (Coax أو Cat6) من الكاميرا لجهاز التسجيل',
                '4. توصيل الكاميرا بمصدر الطاقة (12V DC أو POE)',
                '5. ضبط زاوية الرؤية والتركيز',
                '6. برمجة الإعدادات على جهاز التسجيل',
            ]
        },
        {
            'title': 'مواصفات فنية مهمة',
            'table': {
                'headers': ['المواصفة', 'القيمة', 'الوحدة'],
                'data': [
                    ['دقة التصوير', '1080p - 4K', 'بكسل'],
                    ['سرعة الإطارات', '25-30', 'FPS'],
                    ['زاوية الرؤية', '90-110', 'درجة'],
                    ['الرؤية الليلية', '20-50', 'متر'],
                    ['التخزين', 'حسب عدد الكاميرات', 'TB'],
                ]
            }
        },
        {
            'title': 'حساب سعة التخزين',
            'content': [
                'معادلة حساب مساحة التخزين:',
                'السعة (GB) = عدد الكاميرات × معدل البت (Mbps) × ساعات التسجيل × عدد الأيام ÷ 8',
                'مثال: 8 كاميرات بدقة 1080p ومعدل 4Mbps، تسجيل 24 ساعة لمدة 30 يوم:',
                'السعة = 8 × 4 × 24 × 30 ÷ 8 = 2880 GB = 3 TB تقريباً',
            ]
        },
    ]
    
    create_pdf(
        f"{output_dir}/cctv-guide.pdf",
        "دليل كاميرات المراقبة التلفزيونية",
        "الوحدة الأولى: أنظمة المراقبة (CCTV)",
        cctv_sections
    )
    
    # ====== الوحدة الثانية: إنذار الحريق ======
    fire_sections = [
        {
            'title': 'مقدمة في أنظمة إنذار الحريق',
            'content': [
                'تهدف أنظمة إنذار الحريق إلى الكشف المبكر عن الحرائق وإنذار occupants للإخلاء الفوري. تعتبر هذه الأنظمة إلزامية في جميع المنشآت العامة والتجارية.',
                'تتكون الأنظمة من: لوحة التحكم، الكواشف، أجهزة الإنذار، ومصادر الطاقة الاحتياطية.',
            ]
        },
        {
            'title': 'أنواع الكواشف',
            'table': {
                'headers': ['النوع', 'مبدأ العمل', 'موقع التركيب'],
                'data': [
                    ['كاشف الدخان (Ionization)', 'تأين الهواء بالجسيمات', 'المكاتب والغرف'],
                    ['كاشف الدخان (Photoelectric)', 'انحراف الضوء بالدخان', 'الممرات والسلالم'],
                    ['كاشف الحرارة', 'ارتفاع درجة الحرارة', 'المطابخ والورش'],
                    ['كاشف اللهب', 'الأشعة تحت الحمراء/UV', 'غرف الكهرباء'],
                    ['كاشف متعدد', 'دمج عدة تقنيات', 'المناطق الحساسة'],
                ]
            }
        },
        {
            'title': 'مكونات لوحة التحكم',
            'content': [
                '• وحدة المعالجة المركزية (CPU)',
                '• لوحة المفاتيح والشاشة',
                '• بطاريات احتياطية (12V DC)',
                '• مخرجات للتحكم في الأنظمة الأخرى',
                '• منافذ اتصال مع مركز الإطفاء',
            ]
        },
        {
            'title': 'خطوات التركيب والبرمجة',
            'content': [
                '1. تحديد مواقع الكواشف حسب المخطط المعتمد',
                '2. تمديد الأسلاك (عادة 1.5mm²)',
                '3. تركيب قواعد الكواشف على السقف',
                '4. توصيل الكواشف على التوالي (Class A أو B)',
                '5. تركيب لوحة التحكم في غرفة الأمن',
                '6. برمجة المناطق والمناطق',
                '7. اختبار النظام بالكامل',
            ]
        },
        {
            'title': 'جدول الصيانة الدورية',
            'table': {
                'headers': ['الفحص', 'المدة', 'المسؤول'],
                'data': [
                    ['فحص الكواشف', 'شهرياً', 'الفني المختص'],
                    ['اختبار البطاريات', 'كل 3 أشهر', 'الفني المختص'],
                    ['فحص الأسلاك', 'كل 6 أشهر', 'مهندس كهرباء'],
                    ['اختبار شامل', 'سنوياً', 'شركة متخصصة'],
                ]
            }
        },
    ]
    
    create_pdf(
        f"{output_dir}/fire-alarm-guide.pdf",
        "دليل أنظمة إنذار الحريق",
        "الوحدة الثانية: أنظمة الإطفاء والإنذار",
        fire_sections
    )
    
    # ====== الوحدة الثالثة: إنذار السرقة ======
    intrusion_sections = [
        {
            'title': 'مقدمة في أنظمة إنذار السرقة',
            'content': [
                'تعمل أنظمة إنذار السرقة على اكتشاف أي محاولة اقتحام أو تسلل وإنذار المالك والجهات الأمنية.',
                'تتكون من: لوحة التحكم، أجهزة الكشف، لوحة المفاتيح، أجهزة الإنذار، ووحدات الاتصال.',
            ]
        },
        {
            'title': 'أنواع المستشعرات',
            'table': {
                'headers': ['المستشعر', 'مبدأ العمل', 'المدى'],
                'data': [
                    ['مستشعر الحركة PIR', 'الأشعة تحت الحمراء السلبية', '10-15 م'],
                    ['مستشعر المغناطيسي', 'فتح/إغلاق الباب أو النافذة', '2-3 سم'],
                    ['مستشعر الزجاج', 'اهتزاز أو تكسر الزجاج', '5-7 م'],
                    ['مستشعر الاهتزاز', 'كشف محاولات الكسر', 'على الأسطح'],
                    ['مستشعر الضغط', 'الضغط على السطح', 'تح السجاد'],
                ]
            }
        },
        {
            'title': 'أنظمة الاتصال',
            'content': [
                '• خط هاتف أرضي (PSTN)',
                '• شبكة GSM (رسائل SMS ومكالمات)',
                '• شبكة IP عبر الإنترنت',
                '• نظام GPRS للمراقبة عن بعد',
                '• Dual Path للتوفر العالي',
            ]
        },
        {
            'title': 'خطوات البرمجة',
            'content': [
                '1. إدخال كود المبرمج',
                '2. تعريف المناطق (Zones)',
                '3. برمجة أكواد المستخدمين',
                '4. ضبط أرقام الاتصال الهاتفي',
                '5. برمجة أوقات التسليح التلقائي',
                '6. اختبار النظام',
            ]
        },
        {
            'title': 'جدول استكشاف الأعطال',
            'table': {
                'headers': ['العطل', 'السبب المحتمل', 'الحل'],
                'data': [
                    ['إنذار كاذب', 'حساسية عالية، حيوانات', 'ضبط الحساسية'],
                    ['لا يعمل النظام', 'انقطاع التيار، بطارية', 'فحص الطاقة'],
                    ['رسالة خطأ', 'سلك مقطوع، مستشعر', 'فحص التوصيلات'],
                    ['لا يتصل', 'خط هاتف معطل', 'فحص الخط'],
                ]
            }
        },
    ]
    
    create_pdf(
        f"{output_dir}/intrusion-guide.pdf",
        "دليل أنظمة إنذار السرقة",
        "الوحدة الثالثة: أنظمة الحماية من السرقة",
        intrusion_sections
    )
    
    # ====== الوحدة الرابعة: التحكم بالوصول ======
    access_sections = [
        {
            'title': 'مقدمة في أنظمة التحكم بالوصول',
            'content': [
                'تتيح أنظمة التحكم بالوصول تنظيم دخول وخروج الأشخاص إلى المناطق المحددة وفقاً للصلاحيات الممنوحة.',
                'تتراوح هذه الأنظمة من البسيطة (قارئ بطاقة واحدة) إلى المعقدة (شبكة موحدة لمبنى كامل).',
            ]
        },
        {
            'title': 'تقنيات التعريف',
            'table': {
                'headers': ['التقنية', 'المميزات', 'مستوى الأمان'],
                'data': [
                    ['بطاقة RFID', 'سريعة، اقتصادية', 'متوسط'],
                    ['بطاقة ذكية', 'تشفير عالي، ذاكرة', 'عالي'],
                    ['بصمة الإصبع', 'لا يمكن فقدانها', 'عالي جداً'],
                    ['التعرف على الوجه', 'بدون لمس، سريع', 'عالي جداً'],
                    ['رمز PIN', 'بسيط، بدون بطاقة', 'متوسط'],
                ]
            }
        },
        {
            'title': 'مكونات النظام',
            'content': [
                '• قارئ البطاقات/البصمة (Reader)',
                '• وحدة التحكم المحلية (Controller)',
                '• قفل كهرومغناطيسي أو موتور',
                '• مصدر طاقة مع بطارية احتياطية',
                '• زر الخروج وكسر الطوارئ',
                '• برنامج الإدارة المركزية',
            ]
        },
        {
            'title': 'خطوات التركيب',
            'content': [
                '1. تحديد نقاط الدخول المحمية',
                '2. تركيب القارئ على الجدار بجانب الباب',
                '3. تركيب القفل الكهرومغناطيسي على الإطار',
                '4. تمديد الأسلاك للوحدة التحكم',
                '5. توصيل وحدة التحكم بالشبكة',
                '6. برمجة صلاحيات المستخدمين',
            ]
        },
        {
            'title': 'جدول الصلاحيات',
            'table': {
                'headers': ['المستوى', 'الصلاحيات', 'الأوقات'],
                'data': [
                    ['المستوى 1', 'جميع الأبواب', '24/7'],
                    ['المستوى 2', 'المنطقة الإدارية', '7:00-18:00'],
                    ['المستوى 3', 'المدخل الرئيسي', '8:00-17:00'],
                    ['المستوى 4', 'غرفة الاجتماعات', 'بالطلب'],
                ]
            }
        },
    ]
    
    create_pdf(
        f"{output_dir}/access-control-guide.pdf",
        "دليل أنظمة التحكم بالوصول",
        "الوحدة الرابعة: أنظمة الدخول والصلاحيات",
        access_sections
    )
    
    # ====== الوحدة الخامسة: المقاسم الهاتفية ======
    pbx_sections = [
        {
            'title': 'مقدمة في المقاسم الهاتفية (PBX)',
            'content': [
                'المقسم الهاتفي الخاص (Private Branch Exchange) هو نظام تبديل يربط خطوط الهاتف الداخلية ببعضها ومع الشبكة العامة.',
                'يوفر النظام ميزات متقدمة: التحويل، الانتظار، المؤتمرات، البريد الصوتي، وسجلات المكالمات.',
            ]
        },
        {
            'title': 'أنواع المقاسم',
            'table': {
                'headers': ['النوع', 'التقنية', 'المميزات'],
                'data': [
                    ['Analog PBX', 'خطوط تناظرية', 'بسيط، اقتصادي'],
                    ['Digital PBX', 'ISDN/T1/E1', 'جودة عالية، رقمية'],
                    ['IP-PBX', 'VoIP/SIP', 'مرن، قابل للتوسع'],
                    ['Cloud PBX', 'سحابي', 'بدون معدات، شهري'],
                    ['Hybrid PBX', 'مختلط', 'يدعم التناظري والIP'],
                ]
            }
        },
        {
            'title': 'مكونات النظام',
            'content': [
                '• وحدة المعالجة المركزية (CPU)',
                '• بطاقات الخطوط الخارجية (Trunk Cards)',
                '• بطاقات التمديدات (Extension Cards)',
                '• مصدر طاقة مع بطارية',
                '• هواتف المكتب (Analog/IP)',
                '• كابلات الهاتف (Cat3/Cat5)',
            ]
        },
        {
            'title': 'خطوات التركيب والبرمجة',
            'content': [
                '1. تركيب المقسم في غرفة الاتصالات',
                '2. تمديد الكابلات للمكاتب',
                '2. توصيل الخطوط الخارجية',
                '4. توصيل التمديدات الداخلية',
                '5. برمجة الخطة الرقمية (Numbering Plan)',
                '6. برمجة مجموعات الاتصال',
                '7. ضبط صلاحيات المكالمات',
            ]
        },
        {
            'title': 'جدول الرموز البرمجية',
            'table': {
                'headers': ['الوظيفة', 'الرمز', 'مثال'],
                'data': [
                    ['التحويل', 'Flash + رقم', 'Flash + 101'],
                    ['الانتظار', '* أو R', '*'],
                    ['استعادة', 'Flash', 'Flash'],
                    ['المؤتمر', 'رمز النظام', '*33'],
                    ['صندوق البريد', '*98', '*98'],
                ]
            }
        },
    ]
    
    create_pdf(
        f"{output_dir}/pbx-guide.pdf",
        "دليل المقاسم الهاتفية",
        "الوحدة الخامسة: أنظمة الاتصالات الهاتفية",
        pbx_sections
    )
    
    print("\n✅ تم إنشاء جميع ملفات PDF بنجاح!")

if __name__ == "__main__":
    main()
