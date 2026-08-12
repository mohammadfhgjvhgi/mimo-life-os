#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
توليد ملفات PDF للأدلة العملية - تكنولوجيا المباني الذكية
"""

from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_RIGHT, TA_CENTER, TA_LEFT
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.lib.units import cm
import os

# تسجيل الخطوط العربية
pdfmetrics.registerFont(TTFont('SimHei', '/usr/share/fonts/truetype/chinese/SimHei.ttf'))
registerFontFamily('SimHei', normal='SimHei', bold='SimHei')

# إنشاء مجلد الملفات
os.makedirs('/home/z/my-project/public/downloads', exist_ok=True)

# تعريف الأنماط
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    name='ArabicTitle',
    fontName='SimHei',
    fontSize=24,
    alignment=TA_CENTER,
    spaceAfter=30,
    textColor=colors.HexColor('#1a365d'),
)

heading_style = ParagraphStyle(
    name='ArabicHeading',
    fontName='SimHei',
    fontSize=16,
    alignment=TA_RIGHT,
    spaceAfter=12,
    spaceBefore=20,
    textColor=colors.HexColor('#2c5282'),
)

subheading_style = ParagraphStyle(
    name='ArabicSubheading',
    fontName='SimHei',
    fontSize=14,
    alignment=TA_RIGHT,
    spaceAfter=8,
    spaceBefore=12,
    textColor=colors.HexColor('#2b6cb0'),
)

body_style = ParagraphStyle(
    name='ArabicBody',
    fontName='SimHei',
    fontSize=11,
    alignment=TA_RIGHT,
    spaceAfter=8,
    leading=18,
)

bullet_style = ParagraphStyle(
    name='ArabicBullet',
    fontName='SimHei',
    fontSize=11,
    alignment=TA_RIGHT,
    spaceAfter=4,
    rightIndent=20,
    leading=16,
)

note_style = ParagraphStyle(
    name='ArabicNote',
    fontName='SimHei',
    fontSize=10,
    alignment=TA_RIGHT,
    spaceAfter=6,
    textColor=colors.HexColor('#718096'),
    borderColor=colors.HexColor('#e2e8f0'),
    borderWidth=1,
    borderPadding=8,
)

# محتوى الأدلة
guides = {
    'cctv-guide': {
        'title': 'دليل أنظمة كاميرات المراقبة CCTV',
        'color': '#3182ce',
        'sections': [
            {
                'heading': 'مقدمة في أنظمة المراقبة',
                'content': [
                    'أنظمة المراقبة بالكاميرات (CCTV) هي أحد أهم مكونات الأمان في المباني الحديثة.',
                    'تستخدم هذه الأنظمة لمراقبة ورصد الأنشطة في المناطق المختلفة.',
                ]
            },
            {
                'heading': 'أنواع الكاميرات',
                'subsections': [
                    {
                        'title': 'الكاميرات التماثلية (Analog)',
                        'points': [
                            'تتصل بجهاز DVR عبر كابل Coaxial',
                            'سهلة التركيب والصيانة',
                            'تكلفة أقل مقارنة بالكاميرات الرقمية',
                            'جودة صورة محدودة (حتى 1080p)',
                        ]
                    },
                    {
                        'title': 'الكاميرات الرقمية (IP Cameras)',
                        'points': [
                            'تتصل بالشبكة عبر كابل Cat6',
                            'جودة صورة عالية (حتى 4K)',
                            'إمكانية الطاقة عبر الشبكة (PoE)',
                            'ميزات ذكية متقدمة',
                        ]
                    }
                ]
            },
            {
                'heading': 'خطوات تركيب الكاميرات',
                'content': [
                    '1. تحديد مواقع الكاميرات حسب التغطية المطلوبة',
                    '2. تركيب حوامل الكاميرات بإحكام',
                    '3. سحب الكابلات من الكاميرا لجهاز التسجيل',
                    '4. توصيل الكابلات واختبار الإشارة',
                    '5. ضبط زوايا الكاميرات والتركيز',
                    '6. برمجة جهاز التسجيل والإعدادات',
                ]
            },
            {
                'heading': 'استكشاف الأعطال الشائعة',
                'subsections': [
                    {
                        'title': 'لا توجد صورة من الكاميرا',
                        'points': [
                            'تأكد من توصيل الكابل بشكل صحيح',
                            'افحص مصدر الطاقة للكاميرا',
                            'جرب منفذ آخر على جهاز التسجيل',
                            'استبدل الكابل للتأكد من سلامته',
                        ]
                    },
                    {
                        'title': 'صورة مشوشة أو ضعيفة',
                        'points': [
                            'اضبط تركيز العدسة',
                            'نظف عدسة الكاميرا',
                            'تحقق من جودة الكابل',
                            'قلل طول الكابل إذا كان طويلاً',
                        ]
                    }
                ]
            }
        ]
    },
    'fire-alarm-guide': {
        'title': 'دليل أنظمة إنذار الحريق',
        'color': '#c53030',
        'sections': [
            {
                'heading': 'مقدمة في أنظمة إنذار الحريق',
                'content': [
                    'أنظمة إنذار الحريق ضرورية لحماية الأرواح والممتلكات.',
                    'تكشف هذه الأنظمة الحرائق في مراحلها المبكرة.',
                ]
            },
            {
                'heading': 'أنواع الكواشف',
                'subsections': [
                    {
                        'title': 'كواشف الدخان',
                        'points': [
                            'الكاشف التأيني: للحرائق سريعة الاحتراق',
                            'الكاشف الضوئي: للحرائق بطيئة الاحتراق',
                            'يركب على الأسقف في وسط الغرف',
                        ]
                    },
                    {
                        'title': 'كواشف الحرارة',
                        'points': [
                            'الثابت: يُفعّل عند درجة حرارة معينة',
                            'المتزايد: يكشف سرعة ارتفاع الحرارة',
                            'يستخدم في المطابخ والمراجل',
                        ]
                    }
                ]
            },
            {
                'heading': 'خطوات التركيب',
                'content': [
                    '1. تحديد مواقع الكواشف حسب المخطط',
                    '2. تركيب القواعد وتوصيل الأسلاك',
                    '3. توصيل الكواشف حسب المخطط الكهربائي',
                    '4. برمجة لوحة التحكم',
                    '5. اختبار جميع الكواشف',
                ]
            },
            {
                'heading': 'الصيانة الدورية',
                'content': [
                    'تنظيف الكواشف من الغبار كل 6 أشهر',
                    'اختبار الكواشف شهرياً',
                    'فحص البطاريات كل 3 أشهر',
                    'توثيق جميع عمليات الصيانة',
                ]
            }
        ]
    },
    'intrusion-guide': {
        'title': 'دليل أنظمة إنذار السرقة',
        'color': '#d69e2e',
        'sections': [
            {
                'heading': 'مقدمة في أنظمة إنذار السرقة',
                'content': [
                    'أنظمة إنذار السرقة تحمي المباني من الاختراق والسرقة.',
                    'تستخدم مجموعة من الكواشف لتغطية المنطقة المحمية.',
                ]
            },
            {
                'heading': 'أنواع الكواشف',
                'subsections': [
                    {
                        'title': 'كاشف الحركة PIR',
                        'points': [
                            'يكشف التغيرات في الأشعة تحت الحمراء',
                            'يُركب على ارتفاع 2-2.5 متر',
                            'تجنب مواجهته للنوافذ ومصادر الحرارة',
                        ]
                    },
                    {
                        'title': 'الكاشف المغناطيسي',
                        'points': [
                            'يُركب على الأبواب والنوافذ',
                            'يتكون من جزئين: مغناطيس ومفتاح',
                            'سهل التركيب والصيانة',
                        ]
                    }
                ]
            },
            {
                'heading': 'استكشاف الأعطال',
                'content': [
                    'إنذارات كاذبة: افحص موقع الكواشف والحساسية',
                    'الكاشف لا يعمل: افحص البطارية والأسلاك',
                    'نظام لا يعمل: افحص مصدر الطاقة والبطارية الاحتياطية',
                ]
            }
        ]
    },
    'access-control-guide': {
        'title': 'دليل أنظمة التحكم بالدخول',
        'color': '#38a169',
        'sections': [
            {
                'heading': 'مقدمة في أنظمة التحكم بالدخول',
                'content': [
                    'أنظمة التحكم بالدخول تدير وتتحكم بمن يدخل المبنى.',
                    'توفر أماناً عالياً وسجلاً لجميع الحركات.',
                ]
            },
            {
                'heading': 'أنواع أقفال الأبواب',
                'subsections': [
                    {
                        'title': 'القفل المغناطيسي (Maglock)',
                        'points': [
                            'قوة قفل 600-1200 رطل',
                            'يعمل بمبدأ Fail-Safe',
                            'مناسب للأبواب الزجاجية',
                        ]
                    },
                    {
                        'title': 'القفل الكهربائي (Electric Strike)',
                        'points': [
                            'يعمل مع القفل الميكانيكي الموجود',
                            'استهلاك طاقة أقل',
                            'خيارات Fail-Safe أو Fail-Secure',
                        ]
                    }
                ]
            },
            {
                'heading': 'طرق التعريف',
                'content': [
                    'بطاقات القرب (RFID)',
                    'البصمة الإصبعية',
                    'التعرف على الوجه',
                    'رمز PIN',
                ]
            }
        ]
    },
    'pbx-guide': {
        'title': 'دليل المقاسم الهاتفية PBX',
        'color': '#805ad5',
        'sections': [
            {
                'heading': 'مقدمة في المقاسم الهاتفية',
                'content': [
                    'المقسم الهاتفي PBX هو نظام اتصالات داخلي للمؤسسات.',
                    'يتيح الاتصالات الداخلية والخارجية بكفاءة عالية.',
                ]
            },
            {
                'heading': 'المكونات الأساسية',
                'content': [
                    'التحويلات (Extensions): أرقام داخلية لكل هاتف',
                    'الخطوط الخارجية (Trunk Lines): للاتصال بالشبكة العامة',
                    'لوحة التحكم: لإدارة النظام',
                    'الهواتف: هواتف المكاتب والبدالات',
                ]
            },
            {
                'heading': 'أنواع المقاسم',
                'subsections': [
                    {
                        'title': 'المقاسم التقليدية',
                        'points': [
                            'تعمل بخطوط هواتف تناظرية',
                            'صيانة بسيطة',
                            'تكلفة أقل',
                        ]
                    },
                    {
                        'title': 'المقاسم IP (VoIP)',
                        'points': [
                            'تعمل عبر الشبكة',
                            'ميزات متقدمة',
                            'قابلية توسع عالية',
                        ]
                    }
                ]
            },
            {
                'heading': 'الميزات الأساسية',
                'content': [
                    'تحويل المكالمات',
                    'البريد الصوتي',
                    'الرد الآلي',
                    'تسجيل المكالمات',
                    'المؤتمرات الهاتفية',
                ]
            }
        ]
    }
}

def create_pdf(guide_id, guide_data):
    """إنشاء ملف PDF لدليل معين"""
    filename = f'/home/z/my-project/public/downloads/{guide_id}.pdf'
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm,
        title=guide_data['title'],
        author='Z.ai',
        creator='تكنولوجيا المباني الذكية'
    )
    
    story = []
    
    # العنوان الرئيسي
    story.append(Paragraph(guide_data['title'], title_style))
    story.append(Spacer(1, 20))
    
    # الفصول
    for section in guide_data['sections']:
        # عنوان الفصل
        story.append(Paragraph(section['heading'], heading_style))
        
        # المحتوى النصي
        if 'content' in section:
            for line in section['content']:
                story.append(Paragraph(f'• {line}', bullet_style))
        
        # الأقسام الفرعية
        if 'subsections' in section:
            for subsection in section['subsections']:
                story.append(Paragraph(subsection['title'], subheading_style))
                for point in subsection['points']:
                    story.append(Paragraph(f'  ○ {point}', bullet_style))
        
        story.append(Spacer(1, 10))
    
    # تذييل
    story.append(Spacer(1, 30))
    story.append(Paragraph('─' * 50, body_style))
    story.append(Paragraph('تكنولوجيا المباني الذكية - الصف الثاني عشر صناعي', note_style))
    
    # بناء الملف
    doc.build(story)
    print(f'✓ تم إنشاء: {filename}')
    return filename

# إنشاء جميع الأدلة
if __name__ == '__main__':
    print('بدء توليد ملفات PDF...')
    for guide_id, guide_data in guides.items():
        create_pdf(guide_id, guide_data)
    print('✓ تم إنشاء جميع الملفات بنجاح!')
