# 🎨 MiMo Life OS — Design System Guide

> **المصدر الموحّد لكل قرارات التصميم. كل قسم يجب أن يتبع هذا الدليل.**

---

## ١. المبادئ الأساسية

### ١.١ الوصول خلال ثانيتين
كل وظيفة أساسية يجب أن تكون قابلة للوصول خلال نقرتين أو أقل. لو احتاج المستخدم 3 نقرات → إعادة تصميم.

### ١.٢ التركيز على المحتوى
الـ UI يخدم المحتوى، لا العكس. الأزرار والإطارات تختفي بصرياً وتترك المحتوى يبرز.

### ١.٣ الاتساق فوق الإبداع
نفس الوظيفة = نفس الشكل. لا اختراع أنماط جديدة لكل قسم. الـ patterns موحّدة بالكامل.

### ١.٤ الحركة لها معنى
كل animation تخدم وظيفة (تأكيد فعل، توجيه الانتباه، انتقال حالة). لا حركة زخرفية.

---

## ٢. Design Tokens (المتغيرات الأساسية)

### ٢.١ الألوان (Color Palette)

```css
/* Primary — Emerald (الهوية الأساسية) */
--primary-50:  oklch(0.97 0.02 162);
--primary-500: oklch(0.72 0.17 162);  /* الزر الرئيسي */
--primary-600: oklch(0.62 0.17 162);  /* Hover */
--primary-700: oklch(0.52 0.15 162);  /* Active */

/* Accent — Teal (للتمييز) */
--accent-500:  oklch(0.70 0.13 200);

/* Warning — Amber */
--warning-500: oklch(0.76 0.18 70);

/* Danger — Red */
--danger-500:  oklch(0.65 0.21 25);

/* Semantic */
--success: var(--primary-500);
--info:    var(--accent-500);
--warning: var(--warning-500);
--error:   var(--danger-500);
```

**قاعدة ذهبية**: لا ألوان زرقاء/إنديغو (مبدأ Z.ai). استخدم Emerald/Teal/Amber فقط.

### ٢.٢ المسافات (Spacing Scale)

```css
/* استخدم مضاعفات 4px */
--space-1: 0.25rem;  /* 4px  — فجوات صغيرة داخل عناصر */
--space-2: 0.5rem;   /* 8px  — بين عناصر متجاورة */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px — padding بطاقة */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px — padding قسم */
--space-8: 2rem;     /* 32px — بين sections */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
```

### ٢.٣ الخطوط (Typography)

```css
/* Cairo — الخط الأساسي (عربي + لاتيني) */
--font-sans: 'Cairo', sans-serif;
--font-mono: 'Geist Mono', monospace;

/* Scale (rem-based) */
--text-xs:   0.75rem;  /* 12px — meta, timestamps */
--text-sm:   0.875rem; /* 14px — body, buttons */
--text-base: 1rem;     /* 16px — default */
--text-lg:   1.125rem; /* 18px — section titles */
--text-xl:   1.25rem;  /* 20px — page titles */
--text-2xl:  1.5rem;   /* 24px — hero */
--text-3xl:  1.875rem; /* 30px — dashboard stats */

/* Weights */
--font-normal:    400;
--font-medium:    500;
--font-semibold:  600;
--font-bold:      700;

/* Line heights */
--leading-tight:  1.25;
--leading-normal: 1.5;
--leading-loose:  1.75;
```

### ٢.٤ الزوايا (Border Radius)

```css
--radius-sm: 0.375rem;  /* 6px  — badges, small buttons */
--radius-md: 0.5rem;    /* 8px  — buttons, inputs */
--radius-lg: 0.75rem;   /* 12px — cards */
--radius-xl: 1rem;      /* 16px — modals, large cards */
--radius-full: 9999px;  /* pills, avatars */
```

### ٢.٥ الظلال (Shadows)

```css
/* ناعمة — لا ظلال حادة */
--shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm: 0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.05);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.05);
```

### ٢.٦ الحركات (Animation)

```css
/* Durations */
--duration-fast:   150ms;  /* hover, focus */
--duration-normal: 200ms;  /* transitions */
--duration-slow:   300ms;  /* modals, panels */
--duration-slower: 500ms;  /* page transitions */

/* Easing */
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);     /* معظم الحركات */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* state changes */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* bouncy */
```

---

## ٣. Layout System

### ٣.١ البنية الكلية

```
┌─────────────────────────────────────────┐
│ [Sidebar 64px-256px] │ [Main Content]   │
│                      │                  │
│  • Logo              │  • Top Bar       │
│  • Search (Ctrl+K)   │  • Page Header   │
│  • Navigation        │  • Content Area  │
│  • Footer (user)     │                  │
└─────────────────────────────────────────┘
```

- **Sidebar**: يسار الشاشة، 256px (expanded) / 64px (collapsed)
- **Main**: يأخذ المساحة المتبقية، RTL للمحتوى العربي
- **Top Bar**: 56px ارتفاع، شفاف، يحتوي بحث + إجراءات

### ٣.٢ الـ Grid للأقسام

```css
/* Dashboard: 3 columns على desktop */
grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4

/* Lists: 1 column مع sidebar للفلاتر */
grid-cols-1 lg:grid-cols-[1fr_280px]

/* Cards grid: responsive */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

---

## ٤. Component Patterns

### ٤.١ Page Header (موحّد لكل قسم)

```tsx
<section className="mb-6">
  <div className="flex items-center justify-between gap-4">
    <div>
      <h1 className="text-xl font-bold">عنوان القسم</h1>
      <p className="text-sm text-muted-foreground mt-1">وصف قصير</p>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">فلترة</Button>
      <Button size="sm">+ إضافة</Button>
    </div>
  </div>
</section>
```

### ٤.٢ Card (موحّدة)

```tsx
<Card className="p-4 hover:shadow-md transition-shadow">
  <CardHeader className="p-0 mb-3">
    <h3 className="font-semibold text-base">العنوان</h3>
  </CardHeader>
  <CardContent className="p-0">
    {/* المحتوى */}
  </CardContent>
</Card>
```

**أحجام البطاقات** (حسب تفضيل المستخدم):
- `compact`: `p-3` + `text-sm`
- `comfortable`: `p-4` (افتراضي)
- `spacious`: `p-6` + `text-base`

### ٤.٣ Empty State (موحّد)

```tsx
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-muted-foreground" />
  </div>
  <h3 className="font-semibold mb-1">لا توجد عناصر بعد</h3>
  <p className="text-sm text-muted-foreground mb-4">ابدأ بإضافة أول عنصر</p>
  <Button size="sm">+ إضافة</Button>
</div>
```

### ٤.٤ List Item (موحّد)

```tsx
<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
    <Icon className="w-5 h-5 text-primary" />
  </div>
  <div className="flex-1 min-w-0">
    <p className="font-medium truncate">العنوان</p>
    <p className="text-xs text-muted-foreground truncate">الوصف</p>
  </div>
  <div className="flex items-center gap-1 shrink-0">
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <MoreHorizontal className="w-4 h-4" />
    </Button>
  </div>
</div>
```

### ٤.٥ Form Dialog (موحّد)

```tsx
<Dialog>
  <DialogContent className="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>عنوان النموذج</DialogTitle>
    </DialogHeader>
    <div className="space-y-4 py-2">
      {/* حقول النموذج */}
    </div>
    <DialogFooter>
      <Button variant="outline">إلغاء</Button>
      <Button>حفظ</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### ٤.٦ Stat Card (للـ Dashboard)

```tsx
<Card className="p-4">
  <div className="flex items-center justify-between mb-2">
    <span className="text-xs text-muted-foreground">العنوان</span>
    <Icon className="w-4 h-4 text-muted-foreground" />
  </div>
  <div className="text-2xl font-bold">123</div>
  <div className="text-xs text-emerald-500 mt-1">+5 هذا الأسبوع</div>
</Card>
```

---

## ٥. Interaction Patterns

### ٥.١ Hover States
- **Cards**: `hover:shadow-md transition-shadow`
- **Buttons**: `hover:bg-primary/90`
- **List items**: `hover:bg-accent/50`

### ٥.٢ Loading States
- **Buttons**: spinner + نص "جاري..."
- **Pages**: skeleton بنفس شكل المحتوى النهائي
- **Lists**: 3-5 skeleton rows

### ٥.٣ Error States
- **Toast** للأخطاء العابرة (حفظ فشل، شبكة)
- **Inline** للأخطاء في النماذج (حقل مطلوب)
- **Error Boundary** للأخطاء القاتمة (chunk load, runtime)

### ٥.٤ Success States
- **Toast** أخضر + أيقونة check
- مدة 3 ثواني ثم يختفي تلقائياً

---

## ٦. Accessibility

### ٦.₁ Focus States
- كل عنصر تفاعلي يجب أن يكون قابلاً للوصول بالـ keyboard
- `:focus-visible` يظهر outline واضح (2px solid primary + offset 2px)
- الترتيب المنطقي بالـ Tab

### ٦.٢ ARIA
- كل زر icon له `aria-label`
- كل dialog له `aria-labelledby` + `aria-describedby`
- كل form input له `<Label>` مرتبط

### ٦.٣ Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## ٧. RTL Considerations

### ٧.١ التخطيط
- HTML `dir="rtl"` للحفاظ على القراءة العربية الطبيعية
- السايدبار على اليسار بصرياً (DOM order + flex)
- الأسهم: `→` تعني "التالي" (لليسار في RTL)

### ٧.٢ الأيقونات
- الأيقونات الاتجاهية تُقلب أفقياً
- استخدم `scale-x-[-1]` للأيقونات التي تحتاج قلب

### ٧.٣ الأرقام
- استخدم الأرقام اللاتينية (1, 2, 3) للتواريخ والإحصائيات
- الأرقام العربية (١، ٢، ٣) للنصوص الدينية فقط

---

## ٨. Performance Budgets

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle size per section**: < 50KB (lazy loaded)
- **Image size**: < 200KB (compressed before upload)

---

## ٩. المراجعة

كل قسم جديد أو إعادة تصميم يجب أن يمر بـ:
1. ✅ يتبع الـ design tokens
2. ✅ يستخدم الـ patterns الموحّدة
3. ✅ يجتاز اختبار الوصول خلال ثانيتين
4. ✅ يدعم RTL بشكل صحيح
5. ✅ accessible (keyboard + ARIA)
6. ✅ responsive (mobile + tablet + desktop)
7. ✅ يحترم prefers-reduced-motion
