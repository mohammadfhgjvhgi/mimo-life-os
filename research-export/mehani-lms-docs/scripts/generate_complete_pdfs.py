#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
توليد ملفات PDF عربية شاملة لمنصة تكنولوجيا المباني الذكية
تحتوي على جميع الوحدات والدروس كاملة
"""

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
import arabic_reshaper
from bidi.algorithm import get_display
import os

# تسجيل الخطوط العربية
pdfmetrics.registerFont(TTFont('Amiri', '/home/z/my-project/fonts/Amiri-Regular.ttf'))
pdfmetrics.registerFont(TTFont('Amiri-Bold', '/home/z/my-project/fonts/Amiri-Bold.ttf'))
registerFontFamily('Amiri', normal='Amiri', bold='Amiri-Bold')

# ألوان موحدة
HEADER_COLOR = colors.HexColor('#1F4E79')
SECONDARY_COLOR = colors.HexColor('#2E7D32')
ACCENT_COLOR = colors.HexColor('#C62828')
ROW_EVEN = colors.white
ROW_ODD = colors.HexColor('#F5F5F5')

def reshape_arabic(text):
    """تحويل النص العربي للعرض الصحيح"""
    reshaped = arabic_reshaper.reshape(text)
    return get_display(reshaped)

def create_styles():
    """إنشاء أنماط النص"""
    styles = getSampleStyleSheet()
    
    # عنوان رئيسي كبير
    styles.add(ParagraphStyle(
        name='MainTitle',
        fontName='Amiri-Bold',
        fontSize=26,
        leading=34,
        alignment=TA_CENTER,
        spaceAfter=15,
        textColor=HEADER_COLOR
    ))
    
    # عنوان الوحدة
    styles.add(ParagraphStyle(
        name='UnitTitle',
        fontName='Amiri-Bold',
        fontSize=20,
        leading=28,
        alignment=TA_CENTER,
        spaceBefore=10,
        spaceAfter=15,
        textColor=HEADER_COLOR
    ))
    
    # عنوان الدرس
    styles.add(ParagraphStyle(
        name='LessonTitle',
        fontName='Amiri-Bold',
        fontSize=14,
        leading=20,
        alignment=TA_RIGHT,
        spaceBefore=15,
        spaceAfter=8,
        textColor=SECONDARY_COLOR
    ))
    
    # عنوان فرعي
    styles.add(ParagraphStyle(
        name='SubHeading',
        fontName='Amiri-Bold',
        fontSize=12,
        leading=18,
        alignment=TA_RIGHT,
        spaceBefore=10,
        spaceAfter=6,
        textColor=HEADER_COLOR
    ))
    
    # نص عادي
    styles.add(ParagraphStyle(
        name='Body',
        fontName='Amiri',
        fontSize=11,
        leading=18,
        alignment=TA_RIGHT,
        spaceAfter=6,
    ))
    
    # نص مهم
    styles.add(ParagraphStyle(
        name='Important',
        fontName='Amiri-Bold',
        fontSize=11,
        leading=18,
        alignment=TA_RIGHT,
        spaceAfter=6,
        textColor=ACCENT_COLOR
    ))
    
    # نقاط
    styles.add(ParagraphStyle(
        name='BulletItem',
        fontName='Amiri',
        fontSize=10,
        leading=16,
        alignment=TA_RIGHT,
        leftIndent=20,
        spaceAfter=4,
    ))
    
    # عنوان جدول
    styles.add(ParagraphStyle(
        name='TableHeader',
        fontName='Amiri-Bold',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
        textColor=colors.white
    ))
    
    # خلية جدول
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Amiri',
        fontSize=9,
        leading=12,
        alignment=TA_CENTER,
    ))
    
    return styles

def create_table(headers, data, widths=None):
    """إنشاء جدول منسق"""
    styles = create_styles()
    table_data = []
    
    # Header
    header_row = [Paragraph(reshape_arabic(h), styles['TableHeader']) for h in headers]
    table_data.append(header_row)
    
    # Data
    for row in data:
        data_row = [Paragraph(reshape_arabic(cell), styles['TableCell']) for cell in row]
        table_data.append(data_row)
    
    t = Table(table_data, colWidths=widths)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_COLOR),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('FONTNAME', (0, 0), (-1, -1), 'Amiri'),
        ('FONTSIZE', (0, 0), (-1, 0), 9),
        ('FONTSIZE', (0, 1), (-1, -1), 9),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [ROW_EVEN, ROW_ODD]),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
    ]))
    return t

def add_paragraph(story, text, style_name):
    """إضافة فقرة"""
    styles = create_styles()
    story.append(Paragraph(reshape_arabic(text), styles[style_name]))

def add_table(story, headers, data, widths=None):
    """إضافة جدول"""
    story.append(create_table(headers, data, widths))
    story.append(Spacer(1, 0.4*cm))

# ====== الوحدة الأولى: كاميرات المراقبة ======
def create_cctv_pdf():
    output_dir = "/home/z/my-project/public/downloads"
    filename = f"{output_dir}/cctv-guide.pdf"
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='cctv-guide',
        author='Z.ai',
        creator='Z.ai',
        subject='كاميرات المراقبة'
    )
    
    story = []
    
    # صفحة العنوان
    story.append(Spacer(1, 2*cm))
    add_paragraph(story, "الوحدة الأولى", 'MainTitle')
    add_paragraph(story, "أنظمة كاميرات المراقبة التلفزيونية", 'UnitTitle')
    add_paragraph(story, "(CCTV - Closed Circuit Television)", 'SubHeading')
    story.append(Spacer(1, 1*cm))
    add_paragraph(story, "الصف الثاني عشر صناعي - تكنولوجيا المباني الذكية", 'Body')
    add_paragraph(story, "وزارة التربية والتعليم العالي - فلسطين", 'Body')
    add_paragraph(story, "الفصل الدراسي الثاني 2024-2025", 'Body')
    story.append(PageBreak())
    
    # ============ الدرس الأول ============
    add_paragraph(story, "الدرس الأول: مقدمة في أنظمة المراقبة", 'LessonTitle')
    
    add_paragraph(story, "مفهوم أنظمة المراقبة التلفزيونية:", 'SubHeading')
    add_paragraph(story, "أنظمة المراقبة التلفزيونية (CCTV) هي أنظمة تعمل بالدائرة المغلقة لمراقبة وتسجيل الفيديو. تستخدم لنقل الإشارات من الكاميرات إلى أجهزة تسجيل وعرض محددة، ولا تُبث علناً مثل التلفزيون العادي.", 'Body')
    
    add_paragraph(story, "أهداف أنظمة المراقبة:", 'SubHeading')
    add_paragraph(story, "• رفع مستوى الأمن والسلامة في المنشآت", 'BulletItem')
    add_paragraph(story, "• ردع المجرمين ومنع الجرائم", 'BulletItem')
    add_paragraph(story, "• توثيق الأحداث والحوداث", 'BulletItem')
    add_paragraph(story, "• مراقبة الموظفين والإنتاج", 'BulletItem')
    add_paragraph(story, "• تقديم الأدلة القانونية عند الحاجة", 'BulletItem')
    
    add_paragraph(story, "مكونات نظام المراقبة الأساسية:", 'SubHeading')
    add_table(story, 
        ['المكون', 'الوظيفة', 'ملاحظات'],
        [
            ['الكاميرات', 'التقاط الصور والفيديو', 'أنواع متعددة'],
            ['وسائط النقل', 'نقل الإشارات', 'كابلات أو لاسلكي'],
            ['جهاز التسجيل', 'DVR أو NVR', 'تخزين الفيديو'],
            ['شاشات العرض', 'عرض الصور الحية والمسجلة', 'LED أو LCD'],
            ['الطاقة', 'تغذية الكاميرات', '12V DC أو POE'],
        ]
    )
    
    # ============ الدرس الثاني ============
    add_paragraph(story, "الدرس الثاني: أنواع الكاميرات", 'LessonTitle')
    
    add_paragraph(story, "تصنيف الكاميرات حسب الشكل:", 'SubHeading')
    add_table(story,
        ['النوع', 'الوصف', 'الاستخدام', 'المميزات'],
        [
            ['Dome', 'كروية الشكل، شفافة أو ملونة', 'داخلي', 'صعوبة تحديد الاتجاه'],
            ['BulletItem', 'أسطوانية، صغيرة الحجم', 'خارجي', 'مدى بعيد، سهولة التركيب'],
            ['Box', 'مستطيلة مع عدسة قابلة للتغيير', 'داخلي/خارجي', 'مرونة في اختيار العدسة'],
            ['PTZ', 'قابلة للحركة والدوران', 'مساحات واسعة', 'تحكم عن بعد 360°'],
            ['Hidden', 'مخفية، بأشكال مختلفة', 'مراقبة سرية', 'غير مرئية'],
        ]
    )
    
    add_paragraph(story, "تصنيف الكاميرات حسب التقنية:", 'SubHeading')
    add_table(story,
        ['النوع', 'الإشارة', 'الدقة', 'التوصيل'],
        [
            ['Analog', 'تناظرية', 'SD - 1080p', 'BNC'],
            ['HD-TVI/CVI/AHD', 'تناظرية عالية الدقة', '1080p - 4K', 'BNC'],
            ['IP Network', 'رقمية شبكية', '1080p - 8K', 'RJ45'],
        ]
    )
    
    add_paragraph(story, "مقارنة بين الكاميرات التناظرية والرقمية:", 'SubHeading')
    add_table(story,
        ['المواصفة', 'Analog', 'IP'],
        [
            ['الدقة', 'حتى 1080p', 'حتى 8K'],
            ['المسافة', '300م بدون تضخيم', '100م (Cat6)'],
            ['التكلفة', 'اقتصادية', 'أعلى'],
            ['التركيب', 'سهل', 'يتطلب شبكة'],
            ['التخزين', 'DVR', 'NVR'],
        ]
    )
    
    # ============ الدرس الثالث ============
    add_paragraph(story, "الدرس الثالث: عدسات الكاميرات", 'LessonTitle')
    
    add_paragraph(story, "أنواع العدسات:", 'SubHeading')
    add_paragraph(story, "• عدسة ثابتة (Fixed): زاوية رؤية ثابتة، لا يمكن تعديلها", 'BulletItem')
    add_paragraph(story, "• عدسة متغيرة يدوياً (Varifocal): يمكن تعديل البؤرة يدوياً", 'BulletItem')
    add_paragraph(story, "• عدسة متغيرة آلياً (Zoom): تعديل تلقائي عن بعد", 'BulletItem')
    
    add_paragraph(story, "العلاقة بين البعد البؤري وزاوية الرؤية:", 'SubHeading')
    add_table(story,
        ['البعد البؤري (mm)', 'زاوية الرؤية', 'الاستخدام'],
        [
            ['2.8', '90-110°', 'مساحات واسعة، ممرات'],
            ['3.6', '75-85°', 'غرف عادية'],
            ['6', '50-60°', 'مكاتب، مداخل'],
            ['8', '35-45°', 'ممرات طويلة'],
            ['12', '25-30°', 'تفاصيل بعيدة'],
            ['16-50', '15-20°', 'مراقبة عن بعد'],
        ]
    )
    
    add_paragraph(story, "حساب زاوية الرؤية:", 'SubHeading')
    add_paragraph(story, "زاوية الرؤية الأفقية = 2 × arctan (حجم المستشعر ÷ 2 × البعد البؤري)", 'Important')
    add_paragraph(story, "حجم المستشعر الشائع: 1/3 بوصة = 4.8mm أفقياً", 'Body')
    
    # ============ الدرس الرابع ============
    add_paragraph(story, "الدرس الرابع: كابلات التوصيل", 'LessonTitle')
    
    add_paragraph(story, "أنواع الكابلات المستخدمة:", 'SubHeading')
    
    add_paragraph(story, "1. كابل Coaxial (RG59, RG6):", 'SubHeading')
    add_paragraph(story, "• يستخدم للكاميرات التناظرية و HD-TVI/CVI/AHD", 'BulletItem')
    add_paragraph(story, "• مداه: RG59 حتى 200م، RG6 حتى 300م", 'BulletItem')
    add_paragraph(story, "• يتكون من ناقل داخلي وعزل ودرع موصل", 'BulletItem')
    
    add_paragraph(story, "2. كابل Cat5e/Cat6:", 'SubHeading')
    add_paragraph(story, "• يستخدم للكاميرات IP", 'BulletItem')
    add_paragraph(story, "• مداه: 100م بدون تضخيم", 'BulletItem')
    add_paragraph(story, "• يدعم POE (تغذية عبر الإيثرنت)", 'BulletItem')
    
    add_table(story,
        ['نوع الكابل', 'المدى الأقصى', 'التطبيق', 'التكلفة'],
        [
            ['RG59', '200 م', 'Analog SD', 'منخفضة'],
            ['RG6', '300 م', 'HD-TVI/CVI', 'متوسطة'],
            ['Cat5e', '100 م', 'IP Camera', 'متوسطة'],
            ['Cat6', '100 م', 'IP Camera HD', 'أعلى'],
        ]
    )
    
    add_paragraph(story, "نظام POE (Power over Ethernet):", 'SubHeading')
    add_paragraph(story, "تقنية تسمح بنقل الطاقة والبيانات عبر كابل واحد. توفر التكلفة والوقت في التركيب.", 'Body')
    add_paragraph(story, "أنواع POE:", 'Body')
    add_paragraph(story, "• Passive POE: بسيط، لا تفاوض بالطاقة", 'BulletItem')
    add_paragraph(story, "• 802.3af: حتى 15.4W", 'BulletItem')
    add_paragraph(story, "• 802.3at (POE+): حتى 30W", 'BulletItem')
    add_paragraph(story, "• 802.3bt (POE++): حتى 60-100W", 'BulletItem')
    
    # ============ الدرس الخامس ============
    add_paragraph(story, "الدرس الخامس: أجهزة التسجيل (DVR/NVR)", 'LessonTitle')
    
    add_paragraph(story, "الفرق بين DVR و NVR:", 'SubHeading')
    add_table(story,
        ['المواصفة', 'DVR', 'NVR'],
        [
            ['نوع الكاميرات', 'تناظرية/HD-TVI', 'IP Network'],
            ['التوصيل', 'BNC Coaxial', 'RJ45 Ethernet'],
            ['المعالجة', 'بعد النقل', 'في الكاميرا'],
            ['الدقة', 'محدودة', 'عالية جداً'],
            ['المرونة', 'محدودة', 'عالية'],
        ]
    )
    
    add_paragraph(story, "ميزات أجهزة التسجيل الحديثة:", 'SubHeading')
    add_paragraph(story, "• التسجيل المستمر أو بالكشف عن الحركة", 'BulletItem')
    add_paragraph(story, "• العرض الحي والمسجل في نفس الوقت", 'BulletItem')
    add_paragraph(story, "• الوصول عن بعد عبر التطبيقات", 'BulletItem')
    add_paragraph(story, "• التنبيهات والإشعارات الذكية", 'BulletItem')
    add_paragraph(story, "• النسخ الاحتياطي التلقائي", 'BulletItem')
    
    add_paragraph(story, "حساب سعة التخزين:", 'SubHeading')
    add_paragraph(story, "السعة (GB) = عدد الكاميرات × معدل البت (Mbps) × ساعات التسجيل × عدد الأيام ÷ 8", 'Important')
    story.append(Spacer(1, 0.3*cm))
    add_paragraph(story, "مثال تطبيقي:", 'SubHeading')
    add_paragraph(story, "8 كاميرات بدقة 1080p، معدل 4Mbps، تسجيل 24 ساعة، 30 يوم:", 'Body')
    add_paragraph(story, "السعة = 8 × 4 × 24 × 30 ÷ 8 = 2880 GB ≈ 3 TB", 'Important')
    
    # ============ الدرس السادس ============
    add_paragraph(story, "الدرس السادس: تركيب وضبط الكاميرات", 'LessonTitle')
    
    add_paragraph(story, "خطوات تركيب الكاميرات:", 'SubHeading')
    add_paragraph(story, "1. دراسة الموقع وتحديد مواقع الكاميرات", 'Body')
    add_paragraph(story, "2. رسم مخطط التوصيلات", 'Body')
    add_paragraph(story, "3. تركيب الحوامل على الأسقف أو الجدران", 'Body')
    add_paragraph(story, "4. تمديد الكابلات وتوصيلها", 'Body')
    add_paragraph(story, "5. تركيب الكاميرات وضبط الزوايا", 'Body')
    add_paragraph(story, "6. توصيل الطاقة واختبار الصورة", 'Body')
    add_paragraph(story, "7. برمجة جهاز التسجيل", 'Body')
    add_paragraph(story, "8. اختبار النظام بالكامل", 'Body')
    
    add_paragraph(story, "اعتبارات تركيب مهمة:", 'SubHeading')
    add_paragraph(story, "• ارتفاع التركيب: 2.5-3.5 متر للداخلي، 3-5 متر للخارجي", 'BulletItem')
    add_paragraph(story, "• تجنب الإضاءة المباشرة للكاميرا", 'BulletItem')
    add_paragraph(story, "• تغطية المداخل والمخارج والنقاط الحساسة", 'BulletItem')
    add_paragraph(story, "• استخدام واقيات للكاميرات الخارجية", 'BulletItem')
    add_paragraph(story, "• ترك مسافة كافية للصيانة", 'BulletItem')
    
    add_paragraph(story, "جدول فحص التركيب:", 'SubHeading')
    add_table(story,
        ['الفحص', 'المعيار', 'النتيجة'],
        [
            ['جودة الصورة', 'واضحة، بدون تشويش', '□'],
            ['زاوية الرؤية', 'تغطي المنطقة المطلوبة', '□'],
            ['الإضاءة', 'متوازنة، بدون بهتان', '□'],
            ['التوصيلات', 'محكمة، بدون ارتخاء', '□'],
            ['الطاقة', 'جهد مستقر', '□'],
            ['التسجيل', 'يعمل بشكل صحيح', '□'],
        ]
    )
    
    # ============ الدرس السابع ============
    add_paragraph(story, "الدرس السابع: صيانة أنظمة المراقبة", 'LessonTitle')
    
    add_paragraph(story, "جدول الصيانة الدورية:", 'SubHeading')
    add_table(story,
        ['المهمة', 'المدة', 'المسؤول'],
        [
            ['تنظيف عدسات الكاميرات', 'أسبوعياً', 'المستخدم'],
            ['فحص جودة الصورة', 'أسبوعياً', 'المستخدم'],
            ['التحقق من التسجيل', 'يومياً', 'المستخدم'],
            ['فحص الكابلات', 'شهرياً', 'الفني'],
            ['اختبار البطاريات', 'كل 3 أشهر', 'الفني'],
            ['تنظيف جهاز التسجيل', 'شهرياً', 'الفني'],
            ['فحص شامل للنظام', 'سنوياً', 'المهندس'],
        ]
    )
    
    add_paragraph(story, "مشاكل شائعة وحلولها:", 'SubHeading')
    add_table(story,
        ['المشكلة', 'السبب المحتمل', 'الحل'],
        [
            ['صورة غير واضحة', 'عدسة متسخة أو خارج التركيز', 'تنظيف وضبط البؤرة'],
            ['عدم وجود صورة', 'كابل مفصول أو طاقة', 'فحص التوصيلات'],
            ['تشويش في الصورة', 'تداخل كهربائي', 'تبعيد الكابلات'],
            ['تسجيل متقطع', 'قرص ممتلئ أو تالف', 'تفريغ أو استبدال'],
            ['وصول عن بعد لا يعمل', 'إعدادات الشبكة', 'فحص IP والمنافذ'],
        ]
    )
    
    doc.build(story)
    print(f"Created: {filename}")

# ====== الوحدة الثانية: إنذار الحريق ======
def create_fire_alarm_pdf():
    output_dir = "/home/z/my-project/public/downloads"
    filename = f"{output_dir}/fire-alarm-guide.pdf"
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='fire-alarm-guide',
        author='Z.ai',
        creator='Z.ai',
        subject='إنذار الحريق'
    )
    
    story = []
    
    # صفحة العنوان
    story.append(Spacer(1, 2*cm))
    add_paragraph(story, "الوحدة الثانية", 'MainTitle')
    add_paragraph(story, "أنظمة إنذار الحريق", 'UnitTitle')
    add_paragraph(story, "(Fire Alarm Systems)", 'SubHeading')
    story.append(Spacer(1, 1*cm))
    add_paragraph(story, "الصف الثاني عشر صناعي - تكنولوجيا المباني الذكية", 'Body')
    add_paragraph(story, "وزارة التربية والتعليم العالي - فلسطين", 'Body')
    story.append(PageBreak())
    
    # ============ الدرس الأول ============
    add_paragraph(story, "الدرس الأول: مبادئ إنذار الحريق", 'LessonTitle')
    
    add_paragraph(story, "مفهوم إنذار الحريق:", 'SubHeading')
    add_paragraph(story, "نظام إنذار الحريق هو مجموعة من الأجهزة المترابطة التي تعمل على كشف الحريق في مراحله المبكرة وإنذار الأشخاص الموجودين في المبنى للإخلاء الفوري.", 'Body')
    
    add_paragraph(story, "أهداف نظام إنذار الحريق:", 'SubHeading')
    add_paragraph(story, "• الكشف المبكر عن الحريق", 'BulletItem')
    add_paragraph(story, "• إنذار الأشخاص للإخلاء", 'BulletItem')
    add_paragraph(story, "• الاتصال بمراكز الإطفاء", 'BulletItem')
    add_paragraph(story, "• تفعيل أنظمة الإطفاء التلقائية", 'BulletItem')
    add_paragraph(story, "• إغلاق الأبواب وإيقاف التهوية", 'BulletItem')
    
    add_paragraph(story, "مراحل تطور الحريق:", 'SubHeading')
    add_table(story,
        ['المرحلة', 'المدة', 'الخصائص', 'طريقة الكشف'],
        [
            ['الاشتعال', 'ثوانٍ', 'شرارة صغيرة', 'كاشف اللهب'],
            ['النمو', 'دقائق', 'دخان وحرارة', 'كاشف الدخان/الحرارة'],
            ['الاشتعال الكامل', 'دقائق', 'لهب مكثف', 'كاشف اللهب'],
            ['التراجع', 'دقائق', 'استهلاك الوقود', 'كاشف الحرارة'],
        ]
    )
    
    # ============ الدرس الثاني ============
    add_paragraph(story, "الدرس الثاني: أنواع الكواشف", 'LessonTitle')
    
    add_paragraph(story, "كواشف الدخان:", 'SubHeading')
    add_paragraph(story, "1. كاشف الدخان بالتأين (Ionization):", 'Body')
    add_paragraph(story, "• يحتوي على مادة مشعة صغيرة (Am-241)", 'BulletItem')
    add_paragraph(story, "• يكشف الجسيمات الصغيرة غير المرئية", 'BulletItem')
    add_paragraph(story, "• مناسب للحرائق سريعة الانتشار", 'BulletItem')
    
    add_paragraph(story, "2. كاشف الدخان الضوئي (Photoelectric):", 'Body')
    add_paragraph(story, "• يستخدم مصدر ضوء وكاشف ضوئي", 'BulletItem')
    add_paragraph(story, "• يكشف الجسيمات الكبيرة المرئية", 'BulletItem')
    add_paragraph(story, "• مناسب للحرائق المدخنة البطيئة", 'BulletItem')
    
    add_paragraph(story, "كواشف الحرارة:", 'SubHeading')
    add_table(story,
        ['النوع', 'مبدأ العمل', 'درجة التفعيل', 'التطبيق'],
        [
            ['ثابت الحرارة', 'وصول لدرجة معينة', '57-77°C', 'مطابخ، ورش'],
            ['متصاعد الحرارة', 'معدل الارتفاع', '8°C/دقيقة', 'غرف عادية'],
            ['مركب', 'كلا الطريقتين', 'متغير', 'مناطق حساسة'],
        ]
    )
    
    add_paragraph(story, "كواشف أخرى:", 'SubHeading')
    add_paragraph(story, "• كاشف اللهب: يكشف الأشعة تحت الحمراء والبنفسجية", 'BulletItem')
    add_paragraph(story, "• كاشف متعدد: يجمع عدة تقنيات كشف", 'BulletItem')
    add_paragraph(story, "• كاشف خطي: للكشف عن الحرارة على طول كابل", 'BulletItem')
    
    # ============ الدرس الثالث ============
    add_paragraph(story, "الدرس الثالث: لوحة التحكم", 'LessonTitle')
    
    add_paragraph(story, "مكونات لوحة التحكم:", 'SubHeading')
    add_paragraph(story, "• وحدة المعالجة المركزية (CPU)", 'BulletItem')
    add_paragraph(story, "• لوحة مفاتيح وشاشة عرض", 'BulletItem')
    add_paragraph(story, "• بطاريات احتياطية (12V/24V DC)", 'BulletItem')
    add_paragraph(story, "• منافذ خطوط الكواشف (Loops)", 'BulletItem')
    add_paragraph(story, "• مخرجات تحكم (Relays)", 'BulletItem')
    add_paragraph(story, "• منفذ اتصال هاتفي/شبكي", 'BulletItem')
    
    add_paragraph(story, "أنواع لوحات التحكم:", 'SubHeading')
    add_table(story,
        ['النوع', 'عدد المناطق', 'المميزات', 'التطبيق'],
        [
            ['تقليدي', '2-8 مناطق', 'بسيط، اقتصادي', 'محلات صغيرة'],
            ['عنوني (Addressable)', 'حتى 250 جهاز', 'تحديد موقع الإنذار', 'مباني متوسطة'],
            ['شبكي (Networked)', 'غير محدود', 'ربط عدة لوحات', 'مجمعات كبيرة'],
        ]
    )
    
    add_paragraph(story, "حساب البطاريات الاحتياطية:", 'SubHeading')
    add_paragraph(story, "السعة (Ah) = تيار الحمل (A) × زمن الاحتياط (ساعات) ÷ 0.8", 'Important')
    add_paragraph(story, "مثال: حمل النظام 2A، زمن الاحتياط المطلوب 24 ساعة:", 'Body')
    add_paragraph(story, "السعة = 2 × 24 ÷ 0.8 = 60 Ah", 'Important')
    
    # ============ الدرس الرابع ============
    add_paragraph(story, "الدرس الرابع: أنظمة الكشف العنونية", 'LessonTitle')
    
    add_paragraph(story, "مميزات النظام العنوني:", 'SubHeading')
    add_paragraph(story, "• تحديد موقع الإنذار بدقة", 'BulletItem')
    add_paragraph(story, "• إمكانية برمجة كل كاشف على حدة", 'BulletItem')
    add_paragraph(story, "• تقليل عدد الأسلاك (Loop واحد)", 'BulletItem')
    add_paragraph(story, "• مراقبة مستمرة لسلامة الكواشف", 'BulletItem')
    add_paragraph(story, "• توفير تقارير تفصيلية", 'BulletItem')
    
    add_paragraph(story, "طرق العنونة:", 'SubHeading')
    add_table(story,
        ['الطريقة', 'الوصف', 'المميزات'],
        [
            ['DIP Switch', 'مفاتيح فيزيائية', 'بسيطة'],
            ['العنونة التلقائية', 'تخصيص تلقائي', 'سهولة التركيب'],
            ['Soft Address', 'برمجياً', 'مرونة عالية'],
        ]
    )
    
    # ============ الدرس الخامس ============
    add_paragraph(story, "الدرس الخامس: تركيب وبرمجة النظام", 'LessonTitle')
    
    add_paragraph(story, "خطوات التركيب:", 'SubHeading')
    add_paragraph(story, "1. دراسة المخططات والمواصفات", 'Body')
    add_paragraph(story, "2. تحديد مواقع الكواشف حسب المعايير", 'Body')
    add_paragraph(story, "3. تمديد الأسلاك (عادة 1.5mm²)", 'Body')
    add_paragraph(story, "4. تركيب قواعد الكواشف", 'Body')
    add_paragraph(story, "5. توصيل الكواشف على التوالي (Class A/B)", 'Body')
    add_paragraph(story, "6. تركيب لوحة التحكم في غرفة الأمن", 'Body')
    add_paragraph(story, "7. تركيب أجهزة الإنذار (صفارات/أضواء)", 'Body')
    add_paragraph(story, "8. توصيل الطاقة والبطاريات", 'Body')
    
    add_paragraph(story, "قواعد توزيع الكواشف:", 'SubHeading')
    add_table(story,
        ['المكان', 'نوع الكاشف', 'المسافة بين الكواشف', 'الارتفاع'],
        [
            ['غرف عادية', 'دخان', '9 متر', 'أقل من 7.5م'],
            ['ممرات', 'دخان', '9 متر', 'أقل من 7.5م'],
            ['سلالم', 'دخان', '10 متر', 'أقل من 10م'],
            ['مطابخ', 'حرارة', '7 متر', 'أقل من 7.5م'],
            ['غرف كهرباء', 'لهب', 'حسب المعدات', 'حسب الموقع'],
        ]
    )
    
    # ============ الدرس السادس ============
    add_paragraph(story, "الدرس السادس: صيانة واختبار النظام", 'LessonTitle')
    
    add_paragraph(story, "جدول الصيانة:", 'SubHeading')
    add_table(story,
        ['النشاط', 'التكرار', 'المسؤول'],
        [
            ['اختبار الكواشف', 'شهرياً', 'المستخدم'],
            ['اختبار الصفارات', 'شهرياً', 'المستخدم'],
            ['فحص البطاريات', 'ربع سنوي', 'الفني'],
            ['اختبار خطوط الكشف', 'نصف سنوي', 'الفني'],
            ['فحص شامل', 'سنوياً', 'شركة متخصصة'],
        ]
    )
    
    add_paragraph(story, "طرق الاختبار:", 'SubHeading')
    add_paragraph(story, "• كواشف الدخان: استخدام بخاخ الاختبار المعتمد", 'BulletItem')
    add_paragraph(story, "• كواشف الحرارة: استخدام مجفف شعر حراري", 'BulletItem')
    add_paragraph(story, "• كواشف الطوارئ: استخدام زر الاختبار اليدوي", 'BulletItem')
    add_paragraph(story, "• البطاريات: قياس الجهد والتيار", 'BulletItem')
    
    doc.build(story)
    print(f"Created: {filename}")

# ====== الوحدة الثالثة: إنذار السرقة ======
def create_intrusion_pdf():
    output_dir = "/home/z/my-project/public/downloads"
    filename = f"{output_dir}/intrusion-guide.pdf"
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='intrusion-guide',
        author='Z.ai',
        creator='Z.ai',
        subject='إنذار السرقة'
    )
    
    story = []
    
    # صفحة العنوان
    story.append(Spacer(1, 2*cm))
    add_paragraph(story, "الوحدة الثالثة", 'MainTitle')
    add_paragraph(story, "أنظمة إنذار السرقة", 'UnitTitle')
    add_paragraph(story, "(Intrusion Detection Systems)", 'SubHeading')
    story.append(Spacer(1, 1*cm))
    add_paragraph(story, "الصف الثاني عشر صناعي - تكنولوجيا المباني الذكية", 'Body')
    add_paragraph(story, "وزارة التربية والتعليم العالي - فلسطين", 'Body')
    story.append(PageBreak())
    
    # ============ الدرس الأول ============
    add_paragraph(story, "الدرس الأول: مبادئ إنذار السرقة", 'LessonTitle')
    
    add_paragraph(story, "مفهوم نظام إنذار السرقة:", 'SubHeading')
    add_paragraph(story, "نظام إلكتروني مصمم لاكتشاف محاولات الاقتحام والتسلل غير المصرح بها، وإنذار المالك والجهات الأمنية فوراً.", 'Body')
    
    add_paragraph(story, "مكونات النظام الأساسية:", 'SubHeading')
    add_table(story,
        ['المكون', 'الوظيفة', 'أنواع'],
        [
            ['لوحة التحكم', 'معالجة الإشارات والتحكم', 'سلكي/لاسلكي'],
            ['لوحة المفاتيح', 'التحكم والبرمجة', 'LCD/LED'],
            ['المستشعرات', 'الكشف عن الاقتحام', 'حركة/مغناطيسي/زجاج'],
            ['أجهزة الإنذار', 'التنبيه الصوتي والضوئي', 'صفارة/ضوء'],
            ['وحدة الاتصال', 'الإبلاغ عن الأحداث', 'هاتف/GSM/IP'],
        ]
    )
    
    add_paragraph(story, "حالات النظام:", 'SubHeading')
    add_paragraph(story, "• Armed (مسلح): النظام نشط ويراقب", 'BulletItem')
    add_paragraph(story, "• Disarmed (غير مسلح): النظام متوقف", 'BulletItem')
    add_paragraph(story, "• Stay (بقاء): مسلح مع تجاهل كواشف الحركة الداخلية", 'BulletItem')
    add_paragraph(story, "• Away (مغادرة): مسلح بالكامل", 'BulletItem')
    add_paragraph(story, "• Bypass (تجاوز): تجاهل منطقة معينة", 'BulletItem')
    
    # ============ الدرس الثاني ============
    add_paragraph(story, "الدرس الثاني: المستشعرات", 'LessonTitle')
    
    add_paragraph(story, "مستشعر الحركة PIR:", 'SubHeading')
    add_paragraph(story, "يعمل على كشف الأشعة تحت الحمراء السلبية المنبعثة من الأجسام الحارة.", 'Body')
    add_table(story,
        ['المواصفة', 'القيمة'],
        [
            ['زاوية الكشف', '90-110°'],
            ['المدى', '10-15 متر'],
            ['جهد التشغيل', '9-16 VDC'],
            ['درجة الحرارة', '0-50°C'],
        ]
    )
    
    add_paragraph(story, "أنواع المستشعرات:", 'SubHeading')
    add_table(story,
        ['المستشعر', 'مبدأ العمل', 'المدى', 'التطبيق'],
        [
            ['PIR', 'أشعة تحت حمراء سلبية', '10-15م', 'غرف وممرات'],
            ['مغناطيسي', 'تأثير المجال المغناطيسي', '2-3سم', 'أبواب ونوافذ'],
            ['كاسر الزجاج', 'تردد تكسر الزجاج', '5-7م', 'واجهات زجاجية'],
            ['اهتزاز', 'كشف الاهتزازات', 'حسب الجدار', 'جدران وأسقف'],
            ['ضغط', 'الضغط على السطح', 'تح الأرضية', 'مداخل وممرات'],
            ['مايكرويف', 'موجات رادارية نشطة', '10-20م', 'مناطق مفتوحة'],
        ]
    )
    
    # ============ الدرس الثالث ============
    add_paragraph(story, "الدرس الثالث: المناطق والتوصيلات", 'LessonTitle')
    
    add_paragraph(story, "مفهوم المنطقة (Zone):", 'SubHeading')
    add_paragraph(story, "المنطقة هي مجموعة من المستشعرات المتصلة بمدخل واحد في لوحة التحكم. عند تفعيل أي مستشعر في المنطقة، يتم إرسال إنذار.", 'Body')
    
    add_paragraph(story, "أنواع المناطق:", 'SubHeading')
    add_table(story,
        ['نوع المنطقة', 'الاستجابة', 'التطبيق'],
        [
            ['دخول/خروج', 'تأخير قبل الإنذار', 'الباب الرئيسي'],
            ['داخلي', 'إنذار فوري', 'غرف داخلية'],
            ['داخلي متابع', 'يعمل في وضع Away فقط', 'ممرات'],
            ['24 ساعة', 'إنذار دائم', 'خزائن، طوارئ'],
            ['حريق', 'إنذار دائم مع تمييز', 'كواشف الحريق'],
        ]
    )
    
    add_paragraph(story, "طرق التوصيل:", 'SubHeading')
    add_paragraph(story, "• توصيل على التوالي (Normally Closed): يقطع الدائرة عند التفعيل", 'BulletItem')
    add_paragraph(story, "• توصيل NO (Normally Open): يغلق الدائرة عند التفعيل", 'BulletItem')
    add_paragraph(story, "• مقاومة نهاية الخط (EOL): للكشف عن التلاعب بالأسلاك", 'BulletItem')
    
    # ============ الدرس الرابع ============
    add_paragraph(story, "الدرس الرابع: أنظمة الاتصال", 'LessonTitle')
    
    add_paragraph(story, "طرق الإبلاغ عن الأحداث:", 'SubHeading')
    add_table(story,
        ['الطريقة', 'المميزات', 'العيوب'],
        [
            ['خط هاتف PSTN', 'موثوق، اقتصادي', 'يمكن قطعه'],
            ['GSM', 'لاسلكي، رسائل SMS', 'يحتاج تغطية'],
            ['GPRS/4G', 'بيانات، تتبع', 'اشتراك شهري'],
            ['IP/شبكة', 'سريع، مراقبة حية', 'يتطلب إنترنت'],
            ['Dual Path', 'موثوقية عالية', 'تكلفة أعلى'],
        ]
    )
    
    add_paragraph(story, "تنسيقات الاتصال:", 'SubHeading')
    add_paragraph(story, "• Contact ID: الأكثر شيوعاً، يرسل 16 رقم لكل حدث", 'BulletItem')
    add_paragraph(story, "• 4+2: بسيط، 4 أرقام للحساب + 2 للحدث", 'BulletItem')
    add_paragraph(story, "• SIA: تنسيق رقمي متقدم", 'BulletItem')
    
    # ============ الدرس الخامس ============
    add_paragraph(story, "الدرس الخامس: البرمجة والتركيب", 'LessonTitle')
    
    add_paragraph(story, "خطوات البرمجة الأساسية:", 'SubHeading')
    add_paragraph(story, "1. الدخول لوضع البرمجة (كود المبرمج)", 'Body')
    add_paragraph(story, "2. تعريف المناطق ونوع كل منطقة", 'Body')
    add_paragraph(story, "3. برمجة أكواد المستخدمين", 'Body')
    add_paragraph(story, "4. إدخال أرقام الهواتف للإبلاغ", 'Body')
    add_paragraph(story, "5. ضبط التأخيرات (دخول/خروج)", 'Body')
    add_paragraph(story, "6. برمجة أوقات التسليح التلقائي", 'Body')
    add_paragraph(story, "7. اختبار النظام بالكامل", 'Body')
    
    add_paragraph(story, "جدول استكشاف الأعطال:", 'SubHeading')
    add_table(story,
        ['المشكلة', 'السبب المحتمل', 'الحل'],
        [
            ['إنذار كاذب', 'حساسية عالية، حيوانات', 'ضبط الحساسية'],
            ['لا يعمل النظام', 'انقطاع التيار', 'فحص الطاقة والبطارية'],
            ['رسالة خطأ في المنطقة', 'سلك مقطوع', 'فحص التوصيلات'],
            ['لا يتصل هاتفياً', 'خط معطل', 'فحص الخط الهاتفي'],
            ['لوحة المفاتيح لا تستجيب', 'قفل أو تلف', 'إعادة التشغيل'],
        ]
    )
    
    doc.build(story)
    print(f"Created: {filename}")

# ====== الوحدة الرابعة: التحكم بالوصول ======
def create_access_control_pdf():
    output_dir = "/home/z/my-project/public/downloads"
    filename = f"{output_dir}/access-control-guide.pdf"
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='access-control-guide',
        author='Z.ai',
        creator='Z.ai',
        subject='التحكم بالوصول'
    )
    
    story = []
    
    # صفحة العنوان
    story.append(Spacer(1, 2*cm))
    add_paragraph(story, "الوحدة الرابعة", 'MainTitle')
    add_paragraph(story, "أنظمة التحكم بالوصول", 'UnitTitle')
    add_paragraph(story, "(Access Control Systems)", 'SubHeading')
    story.append(Spacer(1, 1*cm))
    add_paragraph(story, "الصف الثاني عشر صناعي - تكنولوجيا المباني الذكية", 'Body')
    add_paragraph(story, "وزارة التربية والتعليم العالي - فلسطين", 'Body')
    story.append(PageBreak())
    
    # ============ الدرس الأول ============
    add_paragraph(story, "الدرس الأول: مبادئ التحكم بالوصول", 'LessonTitle')
    
    add_paragraph(story, "مفهوم التحكم بالوصول:", 'SubHeading')
    add_paragraph(story, "نظام يسمح بتنظيم دخول وخروج الأشخاص إلى المناطق المحددة بناءً على الصلاحيات الممنوحة. يحدد من، أين، ومتى يمكن الدخول.", 'Body')
    
    add_paragraph(story, "عناصر التحكم بالوصول:", 'SubHeading')
    add_paragraph(story, "1. التعريف (Identification): من أنت؟", 'Body')
    add_paragraph(story, "2. المصادقة (Authentication): هل أنت حقاً من تدعي؟", 'Body')
    add_paragraph(story, "3. التخويل (Authorization): هل لديك صلاحية الدخول؟", 'Body')
    add_paragraph(story, "4. التدقيق (Accountability): تسجيل كل العمليات", 'Body')
    
    add_paragraph(story, "مكونات النظام:", 'SubHeading')
    add_table(story,
        ['المكون', 'الوظيفة', 'أمثلة'],
        [
            ['القارئ', 'قراءة بيانات التعريف', 'بطاقة، بصمة، وجه'],
            ['وحدة التحكم', 'معالجة واتخاذ القرار', 'Controller'],
            ['القفل', 'منع أو السماح بالدخول', 'مغناطيسي، موتور'],
            ['برنامج الإدارة', 'إدارة المستخدمين والصلاحيات', 'Software'],
            ['الطاقة', 'تغذية النظام', 'PSU + Battery'],
        ]
    )
    
    # ============ الدرس الثاني ============
    add_paragraph(story, "الدرس الثاني: تقنيات التعريف", 'LessonTitle')
    
    add_paragraph(story, "تقنيات البطاقات:", 'SubHeading')
    add_table(story,
        ['التقنية', 'التردد', 'المسافة', 'الأمان'],
        [
            ['125kHz (Prox)', 'منخفض', '5-10سم', 'منخفض'],
            ['13.56MHz (Mifare)', 'عالي', '2-10سم', 'متوسط-عالي'],
            ['UHF RFID', 'فائق العالي', '1-10م', 'متوسط'],
            ['QR/Barcode', 'بصري', 'مسح مباشر', 'منخفض'],
        ]
    )
    
    add_paragraph(story, "التقنيات الحيوية (Biometrics):", 'SubHeading')
    add_table(story,
        ['التقنية', 'الدقة', 'السرعة', 'التكلفة'],
        [
            ['بصمة الإصبع', '99.9%', '1-2 ثانية', 'متوسطة'],
            ['التعرف على الوجه', '99.5%', 'أقل من ثانية', 'متوسطة-عالية'],
            ['قزحية العين', '99.99%', '2-3 ثواني', 'عالية'],
            ['الصوت', '95-98%', '3-5 ثواني', 'منخفضة'],
        ]
    )
    
    # ============ الدرس الثالث ============
    add_paragraph(story, "الدرس الثالث: تركيب النظام", 'LessonTitle')
    
    add_paragraph(story, "خطوات التركيب:", 'SubHeading')
    add_paragraph(story, "1. تحديد نقاط الدخول المحمية", 'Body')
    add_paragraph(story, "2. تركيب القارئ على الجدار (ارتفاع 1.2-1.5م)", 'Body')
    add_paragraph(story, "3. تركيب القفل الكهرومغناطيسي على الإطار", 'Body')
    add_paragraph(story, "4. تركيب زر الخروج (REX) وكسر الطوارئ", 'Body')
    add_paragraph(story, "5. تمديد الأسلاك لوحدة التحكم", 'Body')
    add_paragraph(story, "6. توصيل وحدة التحكم بالشبكة", 'Body')
    add_paragraph(story, "7. برمجة الصلاحيات واختبار النظام", 'Body')
    
    add_paragraph(story, "أنواع الأقفال:", 'SubHeading')
    add_table(story,
        ['النوع', 'القوة', 'المميزات', 'التطبيق'],
        [
            ['مغناطيسي', '300-600 كجم', 'سهل التركيب', 'أبواب خشبية/زجاجية'],
            ['موتور قفل', 'متوسطة', 'يفتح ويغلق آلياً', 'أبواب معدنية'],
            ['Strike كهربائي', 'متوسطة', 'يعمل مع القفل الميكانيكي', 'أبواب داخلية'],
            ['Bolt كهربائي', 'قوي جداً', 'أمان عالي', 'أبواب خارجية'],
        ]
    )
    
    # ============ الدرس الرابع ============
    add_paragraph(story, "الدرس الرابع: برمجة الصلاحيات", 'LessonTitle')
    
    add_paragraph(story, "مستويات الصلاحيات:", 'SubHeading')
    add_table(story,
        ['المستوى', 'الصلاحيات', 'أمثلة'],
        [
            ['المستوى 1', 'جميع الأبواب، جميع الأوقات', 'الإدارة العليا'],
            ['المستوى 2', 'مناطق محددة، أوقات العمل', 'الموظفون'],
            ['المستوى 3', 'مدخل رئيسي فقط', 'الزوار'],
            ['المستوى 4', 'صلاحيات مؤقتة', 'المقاولون'],
        ]
    )
    
    add_paragraph(story, "خيارات الوصول:", 'SubHeading')
    add_paragraph(story, "• الوصول المجاني: لا حاجة لبطاقة", 'BulletItem')
    add_paragraph(story, "• بطاقة واحدة: Card Only", 'BulletItem')
    add_paragraph(story, "• بطاقة + PIN: Card + PIN", 'BulletItem')
    add_paragraph(story, "• بطاقتان: Two-Person Rule", 'BulletItem')
    add_paragraph(story, "• بطاقة + بصمة: Multi-Factor", 'BulletItem')
    
    doc.build(story)
    print(f"Created: {filename}")

# ====== الوحدة الخامسة: المقاسم الهاتفية ======
def create_pbx_pdf():
    output_dir = "/home/z/my-project/public/downloads"
    filename = f"{output_dir}/pbx-guide.pdf"
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=1.5*cm,
        leftMargin=1.5*cm,
        topMargin=1.5*cm,
        bottomMargin=1.5*cm,
        title='pbx-guide',
        author='Z.ai',
        creator='Z.ai',
        subject='المقاسم الهاتفية'
    )
    
    story = []
    
    # صفحة العنوان
    story.append(Spacer(1, 2*cm))
    add_paragraph(story, "الوحدة الخامسة", 'MainTitle')
    add_paragraph(story, "المقاسم الهاتفية", 'UnitTitle')
    add_paragraph(story, "(PBX - Private Branch Exchange)", 'SubHeading')
    story.append(Spacer(1, 1*cm))
    add_paragraph(story, "الصف الثاني عشر صناعي - تكنولوجيا المباني الذكية", 'Body')
    add_paragraph(story, "وزارة التربية والتعليم العالي - فلسطين", 'Body')
    story.append(PageBreak())
    
    # ============ الدرس الأول ============
    add_paragraph(story, "الدرس الأول: مبادئ المقاسم الهاتفية", 'LessonTitle')
    
    add_paragraph(story, "مفهوم المقسم الهاتفي الخاص:", 'SubHeading')
    add_paragraph(story, "نظام تبديل هاتفي يربط الخطوط الهاتفية الداخلية ببعضها البعض ومع الشبكة العامة. يوفر ميزات اتصال متقدمة للمؤسسات.", 'Body')
    
    add_paragraph(story, "وظائف المقسم الرئيسية:", 'SubHeading')
    add_paragraph(story, "• تحويل المكالمات داخلياً وخارجياً", 'BulletItem')
    add_paragraph(story, "• عقد المؤتمرات الهاتفية", 'BulletItem')
    add_paragraph(story, "• البريد الصوتي", 'BulletItem')
    add_paragraph(story, "• تسجيل المكالمات", 'BulletItem')
    add_paragraph(story, "• تقارير استخدام الخطوط", 'BulletItem')
    
    add_paragraph(story, "أنواع المقاسم:", 'SubHeading')
    add_table(story,
        ['النوع', 'التقنية', 'المميزات', 'التكلفة'],
        [
            ['تناظري (Analog)', 'PSTN', 'بسيط، اقتصادي', 'منخفضة'],
            ['رقمي (Digital)', 'ISDN/T1/E1', 'جودة عالية', 'متوسطة'],
            ['IP-PBX', 'VoIP/SIP', 'مرن، قابل للتوسع', 'متوسطة'],
            ['Cloud PBX', 'سحابي', 'بدون معدات', 'اشتراك شهري'],
        ]
    )
    
    # ============ الدرس الثاني ============
    add_paragraph(story, "الدرس الثاني: مكونات المقسم", 'LessonTitle')
    
    add_paragraph(story, "المكونات المادية:", 'SubHeading')
    add_table(story,
        ['المكون', 'الوظيفة', 'المواصفات'],
        [
            ['CPU', 'المعالجة والتحكم', 'يختلف حسب السعة'],
            ['بطاقة Trunk', 'خطوط خارجية', '4-32 منفذ'],
            ['بطاقة Extension', 'خطوط داخلية', '8-48 منفذ'],
            ['مصدر الطاقة', 'التغذية', '220V AC / 48V DC'],
            ['البطاريات', 'احتياطي', 'حسب الحمل'],
        ]
    )
    
    add_paragraph(story, "أنواع التمديدات (Extensions):", 'SubHeading')
    add_paragraph(story, "• هاتف تناظري (Analog): يربط بمنفذ FXS", 'BulletItem')
    add_paragraph(story, "• هاتف رقمي (Digital): خاص بالمقاسم الرقمية", 'BulletItem')
    add_paragraph(story, "• هاتف IP: يعمل عبر الشبكة (SIP)", 'BulletItem')
    add_paragraph(story, "• Softphone: تطبيق على الكمبيوتر", 'BulletItem')
    
    # ============ الدرس الثالث ============
    add_paragraph(story, "الدرس الثالث: تركيب وبرمجة المقسم", 'LessonTitle')
    
    add_paragraph(story, "خطوات التركيب:", 'SubHeading')
    add_paragraph(story, "1. تحديد موقع المقسم (غرفة الاتصالات)", 'Body')
    add_paragraph(story, "2. تركيب المقسم في الرف (Rack)", 'Body')
    add_paragraph(story, "3. توصيل الخطوط الخارجية (Trunks)", 'Body')
    add_paragraph(story, "4. تمديد الكابلات للمكاتب", 'Body')
    add_paragraph(story, "5. توصيل الهواتف الداخلية", 'Body')
    add_paragraph(story, "6. توصيل الطاقة والبطاريات", 'Body')
    add_paragraph(story, "7. برمجة المقسم", 'Body')
    
    add_paragraph(story, "الخطة الرقمية (Numbering Plan):", 'SubHeading')
    add_table(story,
        ['النطاق', 'الاستخدام', 'مثال'],
        [
            ['0-9', 'رموز خاصة', '0 للخارج'],
            ['10-19', 'خدمات', '11 للاستعلامات'],
            ['100-199', 'إدارة', '100-110'],
            ['200-299', 'قسم المبيعات', '200-210'],
            ['300-399', 'قسم الدعم', '300-310'],
        ]
    )
    
    add_paragraph(story, "رموز التحكم الشائعة:", 'SubHeading')
    add_table(story,
        ['الوظيفة', 'الرمز', 'ملاحظات'],
        [
            ['التحويل غير المشروط', '*72 + رقم', 'لجميع المكالمات'],
            ['إلغاء التحويل', '*73', '—'],
            ['التحويل عند الانشغال', '*90 + رقم', '—'],
            ['التحويل عند عدم الرد', '*92 + رقم', '—'],
            ['الانتظار', 'R أو Flash', '—'],
            ['المؤتمر', '*33', 'حسب النظام'],
        ]
    )
    
    # ============ الدرس الرابع ============
    add_paragraph(story, "الدرس الرابع: VoIP و SIP", 'LessonTitle')
    
    add_paragraph(story, "مفهوم VoIP:", 'SubHeading')
    add_paragraph(story, "تقنية نقل الصوت عبر بروتوكول الإنترنت (Voice over IP). تحول الصوت إلى حزم بيانات رقمية تنقل عبر الشبكة.", 'Body')
    
    add_paragraph(story, "بروتوكول SIP:", 'SubHeading')
    add_paragraph(story, "بروتوكول بدء الجلسة (Session Initiation Protocol) هو البروتوكول الأساسي لإنشاء وتعديل وإنهاء جلسات الوسائط.", 'Body')
    
    add_paragraph(story, "مميزات IP-PBX:", 'SubHeading')
    add_paragraph(story, "• تكامل مع أنظمة أخرى (CRM, ERP)", 'BulletItem')
    add_paragraph(story, "• إمكانية العمل عن بعد", 'BulletItem')
    add_paragraph(story, "• تقليل تكاليف المكالمات", 'BulletItem')
    add_paragraph(story, "• سهولة التوسع", 'BulletItem')
    add_paragraph(story, "• ميزات متقدمة (Presence, IM)", 'BulletItem')
    
    add_paragraph(story, "متطلبات شبكة VoIP:", 'SubHeading')
    add_table(story,
        ['المتطلب', 'القيمة المثلى', 'السبب'],
        [
            ['عرض النطاق', '100kbps/مكالمة', 'جودة الصوت'],
            ['التأخير (Latency)', 'أقل من 150ms', 'تجنب التقطع'],
            ['Jitter', 'أقل من 30ms', 'استقرار الصوت'],
            ['فقدان الحزم', 'أقل من 1%', 'وضوح الصوت'],
        ]
    )
    
    doc.build(story)
    print(f"Created: {filename}")

# ====== التنفيذ الرئيسي ======
def main():
    print("جاري إنشاء ملفات PDF الشاملة...")
    print("=" * 50)
    
    create_cctv_pdf()
    create_fire_alarm_pdf()
    create_intrusion_pdf()
    create_access_control_pdf()
    create_pbx_pdf()
    
    print("=" * 50)
    print("✅ تم إنشاء جميع ملفات PDF بنجاح!")

if __name__ == "__main__":
    main()
