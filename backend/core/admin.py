from django.contrib import admin
from .models import (
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


@admin.register(NewsArticle)
class NewsArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_published', 'published_at')
    list_filter = ('is_published', 'category')
    search_fields = ('title', 'excerpt')


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
    list_display = ('title', 'category', 'is_featured', 'published_date')
    list_filter = ('category', 'is_featured')
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