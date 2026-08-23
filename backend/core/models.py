import uuid
from django.db import models


class SiteSettings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    site_name = models.CharField(max_length=255, blank=True)
    hero_title1 = models.CharField(max_length=255, blank=True)
    hero_title2 = models.CharField(max_length=255, blank=True)
    hero_subtitle = models.TextField(blank=True)
    hero_btn1 = models.CharField(max_length=100, blank=True)
    hero_btn2 = models.CharField(max_length=100, blank=True)
    about_mission = models.TextField(blank=True)
    about_vision = models.TextField(blank=True)
    donate_suggested_amounts = models.CharField(
        max_length=255, blank=True,
        help_text="Comma-separated amounts, e.g. 25,50,100,250,500,1000",
    )

    class Meta:
        verbose_name_plural = "Site settings"

    def __str__(self):
        return "Site Settings"


class TeamMember(models.Model):
    class TeamType(models.TextChoices):
        LEADERSHIP = 'leadership', 'Leadership'
        BOARD = 'board', 'Board'
        STAFF = 'staff', 'Staff'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    type = models.CharField(max_length=20, choices=TeamType.choices, default=TeamType.STAFF)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    email = models.EmailField(blank=True)
    linkedin = models.URLField(max_length=500, blank=True)
    department = models.CharField(max_length=150, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class AboutValue(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    icon = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class AboutStat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    value = models.CharField(max_length=50)
    label = models.CharField(max_length=150)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.value} {self.label}"


class SuccessStory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    story = models.TextField(blank=True)
    program = models.CharField(max_length=255, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']
        verbose_name_plural = "Success stories"

    def __str__(self):
        return self.name


class ImpactStat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    number = models.IntegerField(default=0)
    label = models.CharField(max_length=150)
    sublabel = models.CharField(max_length=255, blank=True)
    suffix = models.CharField(max_length=10, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.number}{self.suffix} {self.label}"


class Program(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    icon = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    benefits = models.JSONField(default=list, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class VolunteerOpportunity(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    time = models.CharField(max_length=150, blank=True)
    spots = models.CharField(max_length=150, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class VolunteerItem(models.Model):
    class Kind(models.TextChoices):
        REQUIREMENT = 'requirement', 'Requirement'
        BENEFIT = 'benefit', 'Benefit'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    kind = models.CharField(max_length=20, choices=Kind.choices)
    text = models.CharField(max_length=500)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.text[:50]


class UpcomingEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    date = models.CharField(max_length=100, blank=True)
    time = models.CharField(max_length=100, blank=True)
    location = models.CharField(max_length=255, blank=True)
    attendees = models.CharField(max_length=150, blank=True)
    price = models.CharField(max_length=100, blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    featured = models.BooleanField(default=False)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class PastEvent(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    participants = models.CharField(max_length=100, blank=True)
    raised = models.CharField(max_length=100, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class PhotoGallery(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    photo_count = models.IntegerField(default=0)
    cover_url = models.URLField(max_length=500, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']
        verbose_name_plural = "Photo galleries"

    def __str__(self):
        return self.title


class DonateStat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    prefix = models.CharField(max_length=10, blank=True)
    number = models.IntegerField(default=0)
    suffix = models.CharField(max_length=10, blank=True)
    label = models.CharField(max_length=150)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.prefix}{self.number}{self.suffix} {self.label}"


class DonatePaymentMethod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    icon = models.CharField(max_length=50, blank=True)
    name = models.CharField(max_length=150)
    description = models.CharField(max_length=255, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class ContactInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    address = models.TextField(blank=True)
    phone1 = models.CharField(max_length=50, blank=True)
    phone2 = models.CharField(max_length=50, blank=True)
    email1 = models.EmailField(blank=True)
    email2 = models.EmailField(blank=True)
    hours_mon = models.CharField(max_length=100, blank=True)
    hours_sat = models.CharField(max_length=100, blank=True)
    hours_sun = models.CharField(max_length=100, blank=True)
    facebook = models.URLField(max_length=500, blank=True)
    twitter = models.URLField(max_length=500, blank=True)
    instagram = models.URLField(max_length=500, blank=True)
    linkedin = models.URLField(max_length=500, blank=True)

    class Meta:
        verbose_name_plural = "Contact info"

    def __str__(self):
        return "Contact Info"


class DonateBank(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bank_name = models.CharField(max_length=255, blank=True)
    account_name = models.CharField(max_length=255, blank=True)
    account_number = models.CharField(max_length=100, blank=True)
    swift = models.CharField(max_length=50, blank=True)
    email = models.EmailField(blank=True)

    class Meta:
        verbose_name_plural = "Donate bank details"

    def __str__(self):
        return self.bank_name or "Bank Details"


class NewsArticle(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    category = models.CharField(max_length=100, blank=True)
    excerpt = models.TextField(blank=True)
    content = models.TextField(blank=True)
    image_url = models.URLField(max_length=500, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class DonationTier(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    impact_description = models.TextField(blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"${self.amount}"


class Donation(models.Model):
    class DonationType(models.TextChoices):
        ONE_TIME = 'one-time', 'One-time'
        MONTHLY = 'monthly', 'Monthly'

    class PaymentMethod(models.TextChoices):
        CARD = 'card', 'Card'
        BANK_TRANSFER = 'bank_transfer', 'Bank Transfer'
        MOBILE_MONEY = 'mobile_money', 'Mobile Money'

    class PaymentStatus(models.TextChoices):
        PENDING = 'pending', 'Pending'
        COMPLETED = 'completed', 'Completed'
        FAILED = 'failed', 'Failed'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    donation_type = models.CharField(max_length=20, choices=DonationType.choices)
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices)
    payment_status = models.CharField(max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING)
    transaction_reference = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.amount}"


class DonationFAQ(models.Model):
    class SectionType(models.TextChoices):
        WHY_DONATE = 'why_donate', 'Why Donate'
        OTHER_WAYS = 'other_ways', 'Other Ways to Give'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section_type = models.CharField(max_length=20, choices=SectionType.choices)
    text = models.CharField(max_length=1000)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.text[:50]


class PartnerCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category_name = models.CharField(max_length=150)  # e.g. "Corporate", "Government", "NGO & Community"

    class Meta:
        verbose_name_plural = "Partner categories"

    def __str__(self):
        return self.category_name


class Partner(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    category = models.ForeignKey(PartnerCategory, on_delete=models.PROTECT, related_name='partners')
    name = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=50, blank=True, null=True)
    sector_or_scope = models.CharField(max_length=255, blank=True)
    partnership_since = models.CharField(max_length=50, blank=True, null=True)
    logo_url = models.URLField(max_length=500, blank=True, null=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.name


class PartnerTestimonial(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quote = models.TextField()
    author_name = models.CharField(max_length=255)
    author_role = models.CharField(max_length=255, blank=True)
    organization_name = models.CharField(max_length=255, blank=True)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return f"{self.author_name} - {self.organization_name}"


class MediaVideo(models.Model):
    class Section(models.TextChoices):
        ALL = 'all', 'All'
        IMPACT = 'impact', 'Impact Stories'
        PROGRAMS = 'programs', 'Programs'
        EVENTS = 'events', 'Events'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    section = models.CharField(max_length=20, choices=Section.choices, default=Section.ALL)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    category = models.CharField(max_length=100, blank=True)
    video_url = models.URLField(max_length=500, blank=True)
    thumbnail_url = models.URLField(max_length=500, blank=True)
    duration = models.CharField(max_length=20, blank=True)
    date_label = models.CharField(max_length=50, blank=True)
    is_featured = models.BooleanField(default=False)
    published_date = models.DateField(null=True, blank=True)

    class Meta:
        ordering = ['-published_date']

    def __str__(self):
        return self.title


class DownloadableResource(models.Model):
    class ResourceType(models.TextChoices):
        ANNUAL_REPORT = 'report', 'Annual Report'
        BROCHURE_GUIDE = 'brochure', 'Brochure / Guide'
        MEDIA_KIT = 'media', 'Media Kit'
        FORM_APPLICATION = 'form', 'Form / Application'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)  # e.g. "Volunteer Application", "Annual Report 2025"
    description = models.TextField(blank=True, null=True)
    resource_type = models.CharField(max_length=20, choices=ResourceType.choices)
    file_url = models.URLField(max_length=500, blank=True)
    file_type = models.CharField(max_length=20, blank=True)  # e.g. "PDF", "ZIP", "DOCX"
    file_size = models.CharField(max_length=20, blank=True)  # e.g. "2.1 MB"
    year = models.IntegerField(null=True, blank=True)
    download_count = models.IntegerField(default=0)
    display_order = models.IntegerField(default=0)

    class Meta:
        ordering = ['display_order']

    def __str__(self):
        return self.title


class FormSubmission(models.Model):
    class FormType(models.TextChoices):
        CONTACT = 'contact', 'Contact'
        PARTNERSHIP_INQUIRY = 'partnership_inquiry', 'Partnership Inquiry'
        VOLUNTEER = 'volunteer', 'Volunteer'
        RECEIPT_REQUEST = 'receipt_request', 'Receipt Request'
        PROGRAM_ENROLLMENT = 'program_enrollment', 'Program Enrollment'

    class Status(models.TextChoices):
        NEW = 'new', 'New'
        IN_REVIEW = 'in_review', 'In Review'
        APPROVED = 'approved', 'Approved'
        ARCHIVED = 'archived', 'Archived'

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    form_type = models.CharField(max_length=30, choices=FormType.choices)
    applicant_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True, null=True)
    message_or_details = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"{self.applicant_name} - {self.form_type}"
