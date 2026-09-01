import type { Schema, Struct } from '@strapi/strapi';

export interface FormsFormAgree extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_agrees';
  info: {
    displayName: 'Form Agree';
  };
  attributes: {
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsFormCheckbox extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_checkboxes_list';
  info: {
    displayName: 'Form Checkbox';
  };
  attributes: {
    isChecked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FormsFormCheckboxes extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_checkboxes';
  info: {
    displayName: 'Form Checkboxes';
  };
  attributes: {
    items: Schema.Attribute.Component<'forms.form-checkbox', true>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<['checkbox', 'radio']> &
      Schema.Attribute.DefaultTo<'checkbox'>;
  };
}

export interface FormsFormInput extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_inputs';
  info: {
    displayName: 'Form Input';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<['text', 'email']>;
  };
}

export interface FormsFormSelect extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_selects';
  info: {
    displayName: 'Form Select';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.Component<'forms.form-select-options', true>;
    placeholder: Schema.Attribute.String;
  };
}

export interface FormsFormSelectOptions extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_select_options';
  info: {
    displayName: 'Form Select Options';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface FormsFormSubmit extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_submits';
  info: {
    displayName: 'Form Submit';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface FormsFormTextarea extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_textareas';
  info: {
    displayName: 'Form Textarea';
  };
  attributes: {
    isRequired: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placeholder: Schema.Attribute.String;
  };
}

export interface ProductsBuyerDetails extends Struct.ComponentSchema {
  collectionName: 'components_products_buyer_details';
  info: {
    displayName: 'Buyer Details';
  };
  attributes: {
    customerEmail: Schema.Attribute.String;
    customerName: Schema.Attribute.String;
    customerPhone: Schema.Attribute.String;
    deliveryCity: Schema.Attribute.String;
    deliveryMethod: Schema.Attribute.Enumeration<
      ['pickup', 'courier', 'postOperator']
    > &
      Schema.Attribute.DefaultTo<'pickup'>;
    deliveryPostOperator: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Post Office DHL - Victoria Square Branch (Ref: PO-99123)'>;
    deliveryStreet: Schema.Attribute.String;
    deliveryStreetHouse: Schema.Attribute.String;
    orderComments: Schema.Attribute.Text;
  };
}

export interface ProductsProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_products_product_variants';
  info: {
    displayName: 'Product Variant';
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    isColor: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    value: Schema.Attribute.String;
  };
}

export interface ProductsProductVariations extends Struct.ComponentSchema {
  collectionName: 'components_products_product_variations';
  info: {
    displayName: 'Product Variations';
  };
  attributes: {
    color: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    isColor: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    key: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SectionsBestProducts extends Struct.ComponentSchema {
  collectionName: 'components_sections_best_products';
  info: {
    displayName: 'Best Products';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'ui.button', true>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCategories extends Struct.ComponentSchema {
  collectionName: 'components_sections_categories';
  info: {
    displayName: 'Categories';
  };
  attributes: {
    product_categories: Schema.Attribute.Relation<
      'oneToMany',
      'api::product-category.product-category'
    >;
    showAllCategories: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsContacts extends Struct.ComponentSchema {
  collectionName: 'components_sections_contacts';
  info: {
    displayName: 'Contacts';
  };
  attributes: {
    hours: Schema.Attribute.Component<'ui.card-hours', false>;
    location: Schema.Attribute.Component<'ui.card-location', false>;
    socials: Schema.Attribute.Component<'ui.card-connect', false>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_ctas';
  info: {
    displayName: 'CTA';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'ui.button', true>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'Faq';
  };
  attributes: {
    accordion: Schema.Attribute.Component<'ui.card-faq', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFeatures extends Struct.ComponentSchema {
  collectionName: 'components_sections_features';
  info: {
    displayName: 'Features';
  };
  attributes: {
    cards: Schema.Attribute.Component<'ui.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    slides: Schema.Attribute.Component<'ui.hero-slide', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Hero section'>;
  };
}

export interface SectionsHeroTitle extends Struct.ComponentSchema {
  collectionName: 'components_sections_hero_titles';
  info: {
    displayName: 'Hero Title';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLatestArticles extends Struct.ComponentSchema {
  collectionName: 'components_sections_latest_articles';
  info: {
    displayName: 'Latest Articles';
  };
  attributes: {
    counts: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<3>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsOurStory extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_stories';
  info: {
    displayName: 'Our Story';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    stats: Schema.Attribute.Component<'ui.stat-item', true>;
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTeam extends Struct.ComponentSchema {
  collectionName: 'components_sections_teams';
  info: {
    displayName: 'Team';
  };
  attributes: {
    cards: Schema.Attribute.Component<'ui.card-team', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTextSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_text_sections';
  info: {
    displayName: 'Text Section';
  };
  attributes: {
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Text section'>;
    titleTag: Schema.Attribute.Enumeration<
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    > &
      Schema.Attribute.DefaultTo<'h2'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'electronics store, gadgets shop, smartphones UK, laptops, wireless headphones, smartwatches, smart home devices, audio equipment, gaming gear, DeviceLab, buy electronics online'>;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }> &
      Schema.Attribute.DefaultTo<'Discover the latest premium electronics at DeviceLab. Shop smartphones, laptops, wireless audio, wearables, and smart home devices.'>;
    metaRobots: Schema.Attribute.Enumeration<
      ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow']
    > &
      Schema.Attribute.DefaultTo<'index,follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }> &
      Schema.Attribute.DefaultTo<'DeviceLab - Premium Gadgets Store | Smartphones, Laptops'>;
    metaViewport: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'width=device-width, initial-scale=1.0'>;
    ogDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Discover the latest premium electronics at DeviceLab. Shop smartphones, laptops, wireless audio, wearables, and smart home devices. Free UK delivery on orders over \u00A350. 2-year warranty on all products.'>;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DeviceLab - Premium Electronics & Gadgets Store'>;
    ogType: Schema.Attribute.String & Schema.Attribute.DefaultTo<'website'>;
    ogUrl: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    structuredData: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'{ \t\t"@context": "https://schema.org", \t\t"@type": "Organization", \t\t"name": "DeviceLab", \t\t"url": "https://devicelab.com", \t\t"logo": "https://devicelab.com/images/logo.png", \t\t"description": "Premium electronics and gadgets store offering the latest smartphones, laptops, audio equipment, and smart home devices with free UK delivery.", \t\t"address": { \t\t\t\t"@type": "PostalAddress", \t\t\t\t"streetAddress": "123 Oxford Street", \t\t\t\t"addressLocality": "London", \t\t\t\t"addressRegion": "Greater London", \t\t\t\t"postalCode": "W1D 2HG", \t\t\t\t"addressCountry": "GB" \t\t}, \t\t"contactPoint": { \t\t\t\t"@type": "ContactPoint", \t\t\t\t"telephone": "+555-20-123-4567", \t\t\t\t"contactType": "customer service", \t\t\t\t"email": "info@devicelab.com", \t\t\t\t"availableLanguage": ["English"] \t\t}, \t\t"sameAs": [ \t\t\t\t"https://facebook.com/devicelab", \t\t\t\t"https://twitter.com/devicelab", \t\t\t\t"https://instagram.com/devicelab", \t\t\t\t"https://youtube.com/devicelab" \t\t], \t\t"openingHoursSpecification": { \t\t\t\t"@type": "OpeningHoursSpecification", \t\t\t\t"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], \t\t\t\t"opens": "09:00", \t\t\t\t"closes": "18:00" \t\t} }'>;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image', 'app', 'player']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
    twitterDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Discover the latest tech innovations. Smartphones, laptops, audio, wearables & smart home. Free UK delivery on orders over \u00A350.'>;
    twitterImage: Schema.Attribute.Media<'images'>;
    twitterTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DeviceLab - Premium Electronics & Gadgets Store'>;
  };
}

export interface SharedSingleField extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_fields';
  info: {
    displayName: 'Single Field';
  };
  attributes: {
    field: Schema.Attribute.String;
    fieldAdditional: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UiButton extends Struct.ComponentSchema {
  collectionName: 'components_ui_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    style: Schema.Attribute.Enumeration<
      ['btn-primary', 'btn-outline', 'btn-link']
    >;
    title: Schema.Attribute.String;
  };
}

export interface UiCard extends Struct.ComponentSchema {
  collectionName: 'components_ui_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface UiCardConnect extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_connects';
  info: {
    displayName: 'Card Connect';
  };
  attributes: {
    title: Schema.Attribute.String;
  };
}

export interface UiCardFaq extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_faqs';
  info: {
    displayName: 'Card Faq';
  };
  attributes: {
    text: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    title: Schema.Attribute.String;
  };
}

export interface UiCardHours extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_hours';
  info: {
    displayName: 'Card Hours';
  };
  attributes: {
    hours: Schema.Attribute.Component<'shared.single-field', true>;
    title: Schema.Attribute.String;
  };
}

export interface UiCardLocation extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_locations';
  info: {
    displayName: 'Card Location';
  };
  attributes: {
    href: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface UiCardTeam extends Struct.ComponentSchema {
  collectionName: 'components_ui_card_teams';
  info: {
    displayName: 'Card Team';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface UiHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_ui_hero_slides';
  info: {
    displayName: 'Hero Slide';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'ui.button', true>;
    image: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface UiStatItem extends Struct.ComponentSchema {
  collectionName: 'components_ui_stat_items';
  info: {
    displayName: 'Stat Item';
  };
  attributes: {
    number: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'forms.form-agree': FormsFormAgree;
      'forms.form-checkbox': FormsFormCheckbox;
      'forms.form-checkboxes': FormsFormCheckboxes;
      'forms.form-input': FormsFormInput;
      'forms.form-select': FormsFormSelect;
      'forms.form-select-options': FormsFormSelectOptions;
      'forms.form-submit': FormsFormSubmit;
      'forms.form-textarea': FormsFormTextarea;
      'products.buyer-details': ProductsBuyerDetails;
      'products.product-variant': ProductsProductVariant;
      'products.product-variations': ProductsProductVariations;
      'sections.best-products': SectionsBestProducts;
      'sections.categories': SectionsCategories;
      'sections.contacts': SectionsContacts;
      'sections.cta': SectionsCta;
      'sections.faq': SectionsFaq;
      'sections.features': SectionsFeatures;
      'sections.hero': SectionsHero;
      'sections.hero-title': SectionsHeroTitle;
      'sections.latest-articles': SectionsLatestArticles;
      'sections.our-story': SectionsOurStory;
      'sections.team': SectionsTeam;
      'sections.text-section': SectionsTextSection;
      'shared.seo': SharedSeo;
      'shared.single-field': SharedSingleField;
      'shared.social-link': SharedSocialLink;
      'ui.button': UiButton;
      'ui.card': UiCard;
      'ui.card-connect': UiCardConnect;
      'ui.card-faq': UiCardFaq;
      'ui.card-hours': UiCardHours;
      'ui.card-location': UiCardLocation;
      'ui.card-team': UiCardTeam;
      'ui.hero-slide': UiHeroSlide;
      'ui.stat-item': UiStatItem;
    }
  }
}
