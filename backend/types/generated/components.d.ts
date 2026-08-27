import type { Schema, Struct } from '@strapi/strapi';

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
      ['courier', 'pickup', 'postOperator']
    >;
    deliveryPostOperator: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Post Office DHL - Victoria Square Branch (Ref: PO-99123)'>;
    deliveryStreet: Schema.Attribute.String;
    deliveryStreetHouse: Schema.Attribute.String;
    orderComments: Schema.Attribute.Text;
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

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaRobots: Schema.Attribute.Enumeration<
      ['index,follow', 'noindex,follow', 'index,nofollow', 'noindex,nofollow']
    > &
      Schema.Attribute.DefaultTo<'index,follow'>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaViewport: Schema.Attribute.String;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images'>;
    ogTitle: Schema.Attribute.String;
    ogType: Schema.Attribute.String & Schema.Attribute.DefaultTo<'website'>;
    ogUrl: Schema.Attribute.String;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    structuredData: Schema.Attribute.Text;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image', 'app', 'player']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
    twitterDescription: Schema.Attribute.Text;
    twitterImage: Schema.Attribute.Media<'images'>;
    twitterTitle: Schema.Attribute.String;
  };
}

export interface SharedSingleField extends Struct.ComponentSchema {
  collectionName: 'components_shared_single_fields';
  info: {
    displayName: 'Single Field';
  };
  attributes: {
    field: Schema.Attribute.String;
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

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'products.buyer-details': ProductsBuyerDetails;
      'sections.cta': SectionsCta;
      'sections.features': SectionsFeatures;
      'sections.hero': SectionsHero;
      'shared.seo': SharedSeo;
      'shared.single-field': SharedSingleField;
      'shared.social-link': SharedSocialLink;
      'ui.button': UiButton;
      'ui.card': UiCard;
      'ui.hero-slide': UiHeroSlide;
    }
  }
}
