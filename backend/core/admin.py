from django.contrib import admin
from .models import (
    SiteSettings,
    TeamMember,
    AboutValue,
    AboutStat,
    SuccessStory,
    ImpactStat,
    Program,
    VolunteerOpportunity,
    VolunteerItem,
    UpcomingEvent,
    PastEvent,
    PhotoGallery,
    DonateStat,
    DonatePaymentMethod,
    ContactInfo,
    DonateBank,
    NewsArticle,
    DonationTier,
    Donation,
    DonationFAQ,
    PartnerCategory,
    Partner,
    PartnerTestimonial,
    MediaVideo,
    DownloadableResource,
    FormSubmission,
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'hero_title1', 'hero_title2')


@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'type', 'department', 'display_order')
    list_filter = ('type',)
    search_fields = ('name', 'role')


@admin.register(AboutValue)
class AboutValueAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'display_order')


@admin.register(AboutStat)
class AboutStatAdmin(admin.ModelAdmin):
    list_display = ('value', 'label', 'display_order')


@admin.register(SuccessStory)
class SuccessStoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'program', 'display_order')
    search_fields = ('name', 'story')


@admin.register(ImpactStat)
class ImpactStatAdmin(admin.ModelAdmin):
    list_display = ('label', 'number', 'suffix', 'display_order')


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'icon', 'display_order')
    search_fields = ('title', 'description')


@admin.register(VolunteerOpportunity)
class VolunteerOpportunityAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'time', 'display_order')


@admin.register(VolunteerItem)
class VolunteerItemAdmin(admin.ModelAdmin):
    list_display = ('text', 'kind', 'display_order')
    list_filter = ('kind',)


@admin.register(UpcomingEvent)
class UpcomingEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'location', 'featured', 'display_order')
    list_filter = ('featured',)
    search_fields = ('title',)


@admin.register(PastEvent)
class PastEventAdmin(admin.ModelAdmin):
    list_display = ('title', 'participants', 'raised', 'display_order')


@admin.register(PhotoGallery)
class PhotoGalleryAdmin(admin.ModelAdmin):
    list_display = ('title', 'photo_count', 'display_order')


@admin.register(DonateStat)
class DonateStatAdmin(admin.ModelAdmin):
    list_display = ('label', 'prefix', 'number', 'suffix', 'display_order')


@admin.register(DonatePaymentMethod)
class DonatePaymentMethodAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'display_order')


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('phone1', 'email1')


@admin.register(DonateBank)
class DonateBankAdmin(admin.ModelAdmin):
    list_display = ('bank_name', 'account_name', 'account_number')


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_published', 'published_at')
    list_filter = ('is_published', 'category')
    search_fields = ('title', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(DonationTier)
class DonationTierAdmin(admin.ModelAdmin):
    list_display = ('amount', 'display_order')
    ordering = ('display_order',)


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'amount', 'donation_type', 'payment_status', 'created_at')
    list_filter = ('payment_status', 'donation_type', 'payment_method')
    search_fields = ('first_name', 'last_name', 'email')


@admin.register(DonationFAQ)
class DonationFAQAdmin(admin.ModelAdmin):
    list_display = ('text', 'section_type', 'display_order')
    list_filter = ('section_type',)


@admin.register(PartnerCategory)
class PartnerCategoryAdmin(admin.ModelAdmin):
    list_display = ('category_name',)


@admin.register(Partner)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'sector_or_scope', 'display_order')
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(PartnerTestimonial)
class PartnerTestimonialAdmin(admin.ModelAdmin):
    list_display = ('author_name', 'organization_name', 'display_order')


@admin.register(MediaVideo)
class MediaVideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'section', 'category', 'is_featured', 'published_date')
    list_filter = ('section', 'is_featured')
    search_fields = ('title', 'description')


@admin.register(DownloadableResource)
class DownloadableResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'resource_type', 'file_type', 'year', 'download_count', 'display_order')
    list_filter = ('resource_type', 'year')
    search_fields = ('title',)


@admin.register(FormSubmission)
class FormSubmissionAdmin(admin.ModelAdmin):
    list_display = ('applicant_name', 'form_type', 'email', 'status', 'submitted_at')
    list_filter = ('form_type', 'status')
    search_fields = ('applicant_name', 'email')
