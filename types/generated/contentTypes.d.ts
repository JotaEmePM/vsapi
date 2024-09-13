import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAlbumAlbum extends Schema.CollectionType {
  collectionName: 'albums';
  info: {
    singularName: 'album';
    pluralName: 'albums';
    displayName: 'Album';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.UID<'api::album.album', 'name'>;
    artists: Attribute.Relation<
      'api::album.album',
      'manyToMany',
      'api::artist.artist'
    >;
    releaseDate: Attribute.Date;
    type: Attribute.Enumeration<['album', 'single', 'compilation']>;
    spotify_url: Attribute.String;
    apple_music_url: Attribute.String;
    tidal_url: Attribute.String;
    cover: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    totalTracks: Attribute.Integer;
    products: Attribute.Relation<
      'api::album.album',
      'oneToMany',
      'api::product.product'
    >;
    colorimage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::album.album',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::album.album',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArtistArtist extends Schema.CollectionType {
  collectionName: 'artists';
  info: {
    singularName: 'artist';
    pluralName: 'artists';
    displayName: 'Artist';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    active: Attribute.Boolean;
    Description: Attribute.RichText;
    images: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    genre: Attribute.Enumeration<
      [
        'A Cappella',
        'Abstract',
        'Abstract Beats',
        'Abstract Hip Hop',
        'Abstract Idm',
        'Abstractro',
        'Accordion',
        'Acid House',
        'Acid Jazz',
        'Acid Techno',
        'Acousmatic',
        'Acoustic Blues',
        'Acoustic Pop',
        'Adult Standards',
        'African Percussion',
        'African Rock',
        'Afrikaans',
        'Afrobeat',
        'Afrobeats',
        'Aggrotech',
        'Albanian Pop',
        'Album Rock',
        'Albuquerque Indie',
        'Alternative Americana',
        'Alternative Country',
        'Alternative Dance',
        'Alternative Emo',
        'Alternative Hardcore',
        'Alternative Hip Hop',
        'Alternative Metal',
        'Alternative Metalcore',
        'Alternative New Age',
        'Alternative Pop',
        'Alternative Pop Rock',
        'Alternative R&amp;b',
        'Alternative Rock',
        'Alternative Roots Rock',
        'Ambeat',
        'Ambient',
        'Ambient Dub Techno',
        'Ambient Fusion',
        'Ambient Idm',
        'Ambient Psychill',
        'Ambient Trance',
        'Anarcho-punk',
        'Andean',
        'Anime',
        'Anime Score',
        'Anti-folk',
        'Antiviral Pop',
        'Appalachian Folk',
        'Arab Folk',
        'Arab Pop',
        'Arabesk',
        'Argentine Indie',
        'Argentine Reggae',
        'Argentine Rock',
        'Armenian Folk',
        'Art Rock',
        'Athens Indie',
        'Atmospheric Black Metal',
        'Atmospheric Post Rock',
        'Atmospheric Post-metal',
        'Aussietronica',
        'Austindie',
        'Australian Alternative Rock',
        'Australian Country',
        'Australian Dance',
        'Australian Hip Hop',
        'Australian Indie',
        'Australian Pop',
        'Austrian Hip Hop',
        'Austropop',
        'Avant-garde',
        'Avant-garde Jazz',
        'Avantgarde Metal',
        'Axe',
        'Azonto',
        'Bachata',
        'Baile Funk',
        'Balearic',
        'Balkan Brass',
        'Banda',
        'Bangla',
        'Barbershop',
        'Barnemusikk',
        'Barnmusik',
        'Baroque',
        'Baroque Ensemble',
        'Basque Rock',
        'Bass Music',
        'Bass Trip',
        'Bassline',
        'Bay Area Hip Hop',
        'Beach Music',
        'Beatdown',
        'Beats &amp; Rhymes',
        'Bebop',
        'Belgian Indie',
        'Belgian Rock',
        'Belly Dance',
        'Belorush',
        'Bemani',
        'Benga',
        'Bhangra',
        'Big Band',
        'Big Beat',
        'Big Room',
        'Black Death',
        'Black Metal',
        'Black Sludge',
        'Black Thrash',
        'Blackgaze',
        'Blaskapelle',
        'Bluegrass',
        'Blues',
        'Blues-rock',
        'Blues-rock Guitar',
        'Bmore',
        'Bolero',
        'Boogaloo',
        'Boogie-woogie',
        'Bossa Nova',
        'Bossa Nova Jazz',
        'Boston Rock',
        'Bounce',
        'Bouncy House',
        'Bow Pop',
        'Boy Band',
        'Brass Band',
        'Brass Ensemble',
        'Brazilian Composition',
        'Brazilian Gospel',
        'Brazilian Hip Hop',
        'Brazilian Indie',
        'Brazilian Pop Music',
        'Brazilian Punk',
        'Breakbeat',
        'Breakcore',
        'Breaks',
        'Brega',
        'Breton Folk',
        'Brill Building Pop',
        'British Alternative Rock',
        'British Blues',
        'British Brass Band',
        'British Dance Band',
        'British Folk',
        'British Indie Rock',
        'British Invasion',
        'Britpop',
        'Broadway',
        'Broken Beat',
        'Brooklyn Indie',
        'Brostep',
        'Brutal Death Metal',
        'Brutal Deathcore',
        'Bubble Trance',
        'Bubblegum Dance',
        'Bubblegum Pop',
        'Bulgarian Rock',
        'Byzantine',
        'C-pop',
        'C64',
        'C86',
        'Cabaret',
        'Cajun',
        'Calypso',
        'Canadian Country',
        'Canadian Hip Hop',
        'Canadian Indie',
        'Canadian Metal',
        'Canadian Pop',
        'Candy Pop',
        'Cantautor',
        'Cante Flamenco',
        'Canterbury Scene',
        'Cantopop',
        'Canzone Napoletana',
        'Capoeira',
        'Carnatic',
        'Catstep',
        'Caucasian Folk',
        'Ccm',
        'Ceilidh',
        'Cello',
        'Celtic',
        'Celtic Christmas',
        'Celtic Punk',
        'Celtic Rock',
        'Central Asian Folk',
        'Chalga',
        'Chamber Pop',
        'Chanson',
        'Chanson Quebecois',
        'Chaotic Black Metal',
        'Chaotic Hardcore',
        'Charred Death',
        'Chicago Blues',
        'Chicago House',
        'Chicago Indie',
        'Chicago Soul',
        'Chicano Rap',
        "Children's Christmas",
        "Children's Music",
        'Chilean Rock',
        'Chill Groove',
        'Chill Lounge',
        'Chill-out',
        'Chill-out Trance',
        'Chillstep',
        'Chillwave',
        'Chinese Indie Rock',
        'Chinese Opera',
        'Chinese Traditional',
        'Chip Hop',
        'Chiptune',
        'Choral',
        'Choro',
        'Christian Alternative Rock',
        'Christian Christmas',
        'Christian Dance',
        'Christian Hardcore',
        'Christian Hip Hop',
        'Christian Metal',
        'Christian Music',
        'Christian Punk',
        'Christian Rock',
        'Christmas',
        'Christmas Product',
        'Cinematic Dubstep',
        'Clarinet',
        'Classic Afrobeat',
        'Classic Belgian Pop',
        'Classic Chinese Pop',
        'Classic Colombian Pop',
        'Classic Czech Pop',
        'Classic Danish Pop',
        'Classic Dutch Pop',
        'Classic Eurovision',
        'Classic Finnish Pop',
        'Classic Finnish Rock',
        'Classic French Pop',
        'Classic Funk Rock',
        'Classic Garage Rock',
        'Classic Italian Pop',
        'Classic Norwegian Pop',
        'Classic Peruvian Pop',
        'Classic Polish Pop',
        'Classic Psychedelic Rock',
        'Classic Rock',
        'Classic Russian Pop',
        'Classic Russian Rock',
        'Classic Schlager',
        'Classic Soundtrack',
        'Classic Swedish Pop',
        'Classic Turkish Pop',
        'Classic Venezuelan Pop',
        'Classical',
        'Classical Christmas',
        'Classical Flute',
        'Classical Guitar',
        'Classical Organ',
        'Classical Performance',
        'Classical Period',
        'Classical Piano',
        'College A Cappella',
        'College Marching Band',
        'Colombian Rock',
        'Columbus Ohio Indie',
        'Comedy',
        'Comedy Rock',
        'Comic',
        'Commons',
        'Complextro',
        'Composition D',
        'Concert Piano',
        'Consort',
        'Contemporary Classical',
        'Contemporary Country',
        'Contemporary Folk',
        'Contemporary Jazz',
        'Contemporary Post-bop',
        'Cool Jazz',
        'Corrosion',
        'Corsican Folk',
        'Country',
        'Country Blues',
        'Country Christmas',
        'Country Dawn',
        'Country Gospel',
        'Country Road',
        'Country Rock',
        'Coupe Decale',
        'Coverchill',
        'Covertrance',
        'Cowboy Western',
        'Cowpunk',
        'Crack Rock Steady',
        'Croatian Pop',
        'Crossover Prog',
        'Crossover Thrash',
        'Crunk',
        'Crust Punk',
        'Cryptic Black Metal',
        'Cuban Rumba',
        'Cubaton',
        'Cumbia',
        'Cumbia Funk',
        'Cumbia Sonidera',
        'Cumbia Villera',
        'Cyber Metal',
        'Czech Folk',
        'Czech Rock',
        'Dallas Indie',
        'Dance Pop',
        'Dance Rock',
        'Dance-punk',
        'Dancehall',
        'Dangdut',
        'Danish Hip Hop',
        'Danish Indie',
        'Danish Jazz',
        'Danish Pop',
        'Danish Pop Rock',
        'Dansband',
        'Danseband',
        'Dansktop',
        'Dark Ambient',
        'Dark Black Metal',
        'Dark Cabaret',
        'Dark Electro-industrial',
        'Dark Hardcore',
        'Dark Jazz',
        'Dark Minimal Techno',
        'Dark Progressive House',
        'Dark Psytrance',
        'Dark Wave',
        'Darkstep',
        'Death Core',
        'Death Metal',
        'Deathgrind',
        'Deep Acoustic Pop',
        'Deep Adult Standards',
        'Deep Alternative R&amp;b',
        'Deep Ambient',
        'Deep Baroque',
        'Deep Brazilian Pop',
        'Deep Breakcore',
        'Deep Canadian Indie',
        'Deep Ccm',
        'Deep Cello',
        'Deep Chill',
        'Deep Chill-out',
        'Deep Christian Rock',
        'Deep Classic Garage Rock',
        'Deep Classical Piano',
        'Deep Comedy',
        'Deep Contemporary Country',
        'Deep Dance Pop',
        'Deep Darkpsy',
        'Deep Deep House',
        'Deep Deep Tech House',
        'Deep Delta Blues',
        'Deep Disco',
        'Deep Disco House',
        'Deep Discofox',
        'Deep Downtempo Fusion',
        'Deep Dub Techno',
        'Deep East Coast Hip Hop',
        'Deep Euro House',
        'Deep Eurodance',
        'Deep Filthstep',
        'Deep Flow',
        'Deep Folk Metal',
        'Deep Free Jazz',
        'Deep Freestyle',
        'Deep Full On',
        'Deep Funk',
        'Deep Funk House',
        'Deep G Funk',
        'Deep German Indie',
        'Deep German Punk',
        'Deep Gothic Post-punk',
        'Deep Happy Hardcore',
        'Deep Hardcore',
        'Deep Hardcore Punk',
        'Deep Hardstyle',
        'Deep House',
        'Deep Indian Pop',
        'Deep Indie Pop',
        'Deep Indie Rock',
        'Deep Indie Singer-songwriter',
        'Deep Italo Disco',
        'Deep Jazz Fusion',
        'Deep Jazz Guitar',
        'Deep Jazz Piano',
        'Deep Latin Alternative',
        'Deep Liquid',
        'Deep Liquid Bass',
        'Deep Melodic Death Metal',
        'Deep Melodic Hard Rock',
        'Deep Melodic House',
        'Deep Melodic Metalcore',
        'Deep Minimal Techno',
        'Deep Motown',
        'Deep Neo-synthpop',
        'Deep Neofolk',
        'Deep New Wave',
        'Deep Nordic Folk',
        'Deep Northern Soul',
        'Deep Opera',
        'Deep Orchestral',
        'Deep Orgcore',
        'Deep Pop Emo',
        'Deep Pop Punk',
        'Deep Power-pop Punk',
        'Deep Progressive House',
        'Deep Progressive Trance',
        'Deep Psychobilly',
        'Deep Psytrance',
        'Deep Punk Rock',
        'Deep Ragga',
        'Deep Rai',
        'Deep Regional Mexican',
        'Deep Smooth Jazz',
        'Deep Soft Rock',
        'Deep Soul House',
        'Deep Soundtrack',
        'Deep Southern Soul',
        'Deep Space Rock',
        'Deep String Quartet',
        'Deep Sunset Lounge',
        'Deep Surf Music',
        'Deep Symphonic Black Metal',
        'Deep Talent Show',
        'Deep Tech House',
        'Deep Thrash Metal',
        'Deep Trap',
        'Deep Turkish Pop',
        'Deep Uplifting Trance',
        'Deep Vocal House',
        'Deep Vocal Jazz',
        'Delta Blues',
        'Demoscene',
        'Denver Indie',
        'Depressive Black Metal',
        'Desert Blues',
        'Desi',
        'Destroy Techno',
        'Detroit Hip Hop',
        'Detroit Techno',
        'Didgeridoo',
        'Digital Hardcore',
        'Dirty South Rap',
        'Dirty Texas Rap',
        'Disco',
        'Disco House',
        'Discofox',
        'Dixieland',
        'Djent',
        'Dominican Pop',
        'Doo-wop',
        'Doom Metal',
        'Doomcore',
        'Doujin',
        'Downtempo',
        'Downtempo Fusion',
        'Downtempo Trip Hop',
        'Drama',
        'Dream Pop',
        'Dreamo',
        'Drill And Bass',
        'Drone',
        'Drone Folk',
        'Drone Metal',
        'Drone Psych',
        'Drum And Bass',
        'Drumfunk',
        'Dub',
        'Dub Techno',
        'Dubstep',
        'Dubstep Product',
        'Dubsteppe',
        'Duranguense',
        'Dutch Hip Hop',
        'Dutch House',
        'Dutch Pop',
        'Dutch Rock',
        'E6fi',
        'Early Music',
        'Early Music Ensemble',
        'East Coast Hip Hop',
        'Easy Listening',
        'Ebm',
        'Ectofolk',
        'Ecuadoria',
        'Edm',
        'Electric Blues',
        'Electro',
        'Electro Dub',
        'Electro House',
        'Electro Jazz',
        'Electro Latino',
        'Electro Swing',
        'Electro Trash',
        'Electro-industrial',
        'Electroacoustic Improvisation',
        'Electroclash',
        'Electrofox',
        'Electronic',
        'Electronica',
        'Electronicore',
        'Electropowerpop',
        'Electropunk',
        'Emo',
        'Emo Punk',
        'Enka',
        'Entehno',
        'Environmental',
        'Epicore',
        'Estonian Pop',
        'Ethereal Gothic',
        'Ethereal Wave',
        'Etherpop',
        'Ethiopian Pop',
        'Eurobeat',
        'Eurodance',
        'Europop',
        'Euroska',
        'Eurovision',
        'Exotica',
        'Experimental',
        'Experimental Dubstep',
        'Experimental Psych',
        'Experimental Rock',
        'Fado',
        'Fake',
        'Fallen Angel',
        'Faroese Pop',
        'Fast Melodic Punk',
        'Fidget House',
        'Filmi',
        'Filter House',
        'Filthstep',
        'Fingerstyle',
        'Finnish Hardcore',
        'Finnish Hip Hop',
        'Finnish Indie',
        'Finnish Jazz',
        'Finnish Metal',
        'Finnish Pop',
        'Flamenco',
        'Flick Hop',
        'Folk',
        'Folk Christmas',
        'Folk Metal',
        'Folk Punk',
        'Folk Rock',
        'Folk-pop',
        'Folk-prog',
        'Folklore Argentino',
        'Folkmusik',
        'Footwork',
        'Forro',
        'Fourth World',
        'Freak Folk',
        'Freakbeat',
        'Free Improvisation',
        'Free Jazz',
        'Freestyle',
        'French Folk',
        'French Folk Pop',
        'French Hip Hop',
        'French Indie Pop',
        'French Movie Tunes',
        'French Pop',
        'French Punk',
        'French Reggae',
        'French Rock',
        'Full On',
        'Funeral Doom',
        'Funk',
        'Funk Carioca',
        'Funk Metal',
        'Funk Rock',
        'Funky Breaks',
        'Future Ambient',
        'Future Garage',
        'Futurepop',
        'G Funk',
        'Gabba',
        'Galego',
        'Gamecore',
        'Gamelan',
        'Gangster Rap',
        'Garage Pop',
        'Garage Punk',
        'Garage Punk Blues',
        'Garage Rock',
        'Gauze Pop',
        'Gbvfi',
        'Geek Folk',
        'Geek Rock',
        'German Ccm',
        'German Hip Hop',
        'German Indie',
        'German Metal',
        'German Oi',
        'German Pop',
        'German Pop Rock',
        'German Punk',
        'German Show Tunes',
        'German Techno',
        'Ghettotech',
        'Ghoststep',
        'Girl Group',
        'Glam Metal',
        'Glam Rock',
        'Glitch',
        'Glitch Beats',
        'Glitch Hop',
        'Glitter Trance',
        'Goa Trance',
        'Goregrind',
        'Gospel',
        'Gospel Blues',
        'Gospel Reggae',
        'Gothic Alternative',
        'Gothic Americana',
        'Gothic Doom',
        'Gothic Metal',
        'Gothic Post-punk',
        'Gothic Rock',
        'Gothic Symphonic Metal',
        'Grave Wave',
        'Greek Hip Hop',
        'Greek House',
        'Greek Indie',
        'Grim Death Metal',
        'Grime',
        'Grindcore',
        'Grisly Death Metal',
        'Groove Metal',
        'Grunge',
        'Grunge Pop',
        'Grupera',
        'Guidance',
        'Gypsy Jazz',
        'Hands Up',
        'Happy Hardcore',
        'Hard Alternative',
        'Hard Bop',
        'Hard Glam',
        'Hard House',
        'Hard Rock',
        'Hard Stoner Rock',
        'Hard Trance',
        'Hardcore',
        'Hardcore Breaks',
        'Hardcore Hip Hop',
        'Hardcore Punk',
        'Hardcore Techno',
        'Hardstyle',
        'Harmonica Blues',
        'Harp',
        'Hatecore',
        'Hauntology',
        'Hawaiian',
        'Healing',
        'Heavy Alternative',
        'Heavy Christmas',
        'Heavy Gothic Rock',
        'Hi Nrg',
        'Highlife',
        'Hindustani Classical',
        'Hip Hop',
        'Hip Hop Quebecois',
        'Hip Hop Tuga',
        'Hip House',
        'Hip Pop',
        'Hiplife',
        'Hoerspiel',
        'Hollywood',
        'Honky Tonk',
        'Horror Punk',
        'Horrorcore',
        'House',
        'Hungarian Hip Hop',
        'Hungarian Pop',
        'Hungarian Rock',
        'Hurban',
        'Hyphy',
        'Icelandic Pop',
        'Idol',
        'Illbient',
        'Indian Classical',
        'Indian Pop',
        'Indian Rock',
        'Indie Christmas',
        'Indie Dream Pop',
        'Indie Emo',
        'Indie Emo Rock',
        'Indie Folk',
        'Indie Fuzzpop',
        'Indie Pop',
        'Indie Pop Rock',
        'Indie Post-punk',
        'Indie Psych-pop',
        'Indie R&amp;b',
        'Indie Rock',
        'Indie Shoegaze',
        'Indie Singer-songwriter',
        'Indietronica',
        'Indonesian Indie',
        'Indonesian Pop',
        'Indorock',
        'Industrial',
        'Industrial Metal',
        'Industrial Rock',
        'Instrumental Post Rock',
        'Intelligent Dance Music',
        'Irish Folk',
        'Irish Indie',
        'Irish Rock',
        'Iskelma',
        'Islamic Recitation',
        'Israeli Rock',
        'Italian Disco',
        'Italian Folk',
        'Italian Hip Hop',
        'Italian Indie Pop',
        'Italian Jazz',
        'Italian Pop',
        'Italian Pop Rock',
        'Italian Progressive Rock',
        'Italian Punk',
        'Italo Dance',
        'J-alt',
        'J-ambient',
        'J-core',
        'J-dance',
        'J-idol',
        'J-indie',
        'J-metal',
        'J-pop',
        'J-poppunk',
        'J-poprock',
        'J-punk',
        'J-rap',
        'J-rock',
        'J-theme',
        'Jam Band',
        'Jangle Pop',
        'Jangle Rock',
        'Japanese Jazztronica',
        'Japanese Psychedelic',
        'Japanese R&amp;b',
        'Japanese Standards',
        'Japanese Traditional',
        'Japanoise',
        'Jazz',
        'Jazz Bass',
        'Jazz Blues',
        'Jazz Brass',
        'Jazz Christmas',
        'Jazz Funk',
        'Jazz Fusion',
        'Jazz Metal',
        'Jazz Orchestra',
        'Jazz Trio',
        'Jerk',
        'Jig And Reel',
        'Judaica',
        'Jug Band',
        'Juggalo',
        'Jump Blues',
        'Jump Up',
        'Jumpstyle',
        'Jungle',
        'K-hop',
        'K-indie',
        'K-pop',
        'K-rock',
        'Kabarett',
        'Karneval',
        'Kc Indie',
        'Kindermusik',
        'Kirtan',
        'Kiwi Rock',
        'Kizomba',
        'Klapa',
        'Klezmer',
        'Kompa',
        'Kraut Rock',
        'Kuduro',
        'Kurdish Folk',
        'Kwaito',
        'La Indie',
        'Laboratorio',
        'Laiko',
        'Latin',
        'Latin Alternative',
        'Latin Christian',
        'Latin Christmas',
        'Latin Electronica',
        'Latin Hip Hop',
        'Latin Jazz',
        'Latin Metal',
        'Latin Pop',
        'Latvian Pop',
        'Lds',
        'Leeds Indie',
        'Levenslied',
        'Liedermacher',
        'Light Music',
        'Lilith',
        'Liquid Funk',
        'Lithumania',
        'Liturgical',
        'Lo Star',
        'Lo-fi',
        'Louisiana Blues',
        'Louisville Indie',
        'Lounge',
        'Lounge House',
        'Lovers Rock',
        'Lowercase',
        'Luk Thung',
        'Madchester',
        'Maghreb',
        'Magyar',
        'Makossa',
        'Malagasy Folk',
        'Malaysian Pop',
        'Mallet',
        'Mambo',
        'Mande Pop',
        'Mandopop',
        'Manele',
        'Marching Band',
        'Mariachi',
        'Martial Industrial',
        'Mashup',
        'Math Pop',
        'Math Rock',
        'Mathcore',
        'Mbalax',
        'Medieval',
        'Medieval Rock',
        'Meditation',
        'Melancholia',
        'Melbourne Bounce',
        'Mellow Gold',
        'Melodic Death Metal',
        'Melodic Hard Rock',
        'Melodic Hardcore',
        'Melodic Metalcore',
        'Melodic Power Metal',
        'Melodic Progressive Metal',
        'Memphis Blues',
        'Memphis Hip Hop',
        'Memphis Soul',
        'Merengue',
        'Merengue Urbano',
        'Merseybeat',
        'Metal',
        'Metal Guitar',
        'Metalcore',
        'Metropopolis',
        'Mexican Indie',
        'Mexican Rock-and-roll',
        'Mexican Son',
        'Mexican Traditional',
        'Miami Bass',
        'Michigan Indie',
        'Microhouse',
        'Military Band',
        'Minimal',
        'Minimal Dub',
        'Minimal Dubstep',
        'Minimal Melodic Techno',
        'Minimal Tech House',
        'Minimal Techno',
        'Minimal Wave',
        'Mizrahi',
        'Mod Revival',
        'Modern Blues',
        'Modern Classical',
        'Modern Country Rock',
        'Modern Downshift',
        'Modern Free Jazz',
        'Modern Performance',
        'Modern Southern Rock',
        'Modern Uplift',
        'Monastic',
        'Moombahton',
        'Morna',
        'Motivation',
        'Motown',
        'Movie Tunes',
        'Mpb',
        'Musica Para Ninos',
        'Musiikkia Lapsille',
        'Musique Concrete',
        'Musique Pour Enfants',
        'Muziek Voor Kinderen',
        'Nasheed',
        'Nashville Sound',
        'Native American',
        'Necrogrind',
        'Neo Classical Metal',
        'Neo Honky Tonk',
        'Neo Mellow',
        'Neo Metal',
        'Neo Soul',
        'Neo Soul-jazz',
        'Neo-industrial Rock',
        'Neo-pagan',
        'Neo-progressive',
        'Neo-psychedelic',
        'Neo-rockabilly',
        'Neo-singer-songwriter',
        'Neo-synthpop',
        'Neo-trad Metal',
        'Neo-traditional Country',
        'Neoclassical',
        'Neofolk',
        'Nepali',
        'Nerdcore',
        'Neue Deutsche Harte',
        'Neue Deutsche Welle',
        'Neurofunk',
        'Neurostep',
        'New Age',
        'New Age Piano',
        'New Americana',
        'New Beat',
        'New Jack Smooth',
        'New Jack Swing',
        'New Orleans Blues',
        'New Orleans Jazz',
        'New Rave',
        'New Romantic',
        'New Tribe',
        'New Wave',
        'New Wave Pop',
        'New Weird America',
        'Ninja',
        'Nintendocore',
        'Nl Folk',
        'No Wave',
        'Noise',
        'Noise Pop',
        'Noise Punk',
        'Noise Rock',
        'Nordic Folk',
        'Nordic House',
        'Norteno',
        'Northern Irish Indie',
        'Northern Soul',
        'Norwegian Gospel',
        'Norwegian Hip Hop',
        'Norwegian Jazz',
        'Norwegian Metal',
        'Norwegian Pop',
        'Norwegian Punk',
        'Norwegian Rock',
        'Nu Age',
        'Nu Disco',
        'Nu Electro',
        'Nu Gaze',
        'Nu Jazz',
        'Nu Metal',
        'Nu Skool Breaks',
        'Nu-cumbia',
        'Nueva Cancion',
        'Nursery',
        'Nwobhm',
        'Nwothm',
        'Nz Indie',
        'Oi',
        'Old School Hip Hop',
        'Old-time',
        'Opera',
        'Operatic Pop',
        'Opm',
        'Oratory',
        'Orchestral',
        'Organic Ambient',
        'Orgcore',
        'Orquesta Tipica',
        'Orquesta Tropical',
        'Oshare Kei',
        'Ostrock',
        'Outer Hip Hop',
        'Outlaw Country',
        'Outsider',
        'Outsider House',
        'P Funk',
        'Pagan Black Metal',
        'Pagode',
        'Pakistani Pop',
        'Permanent Wave',
        'Persian Pop',
        'Persian Traditional',
        'Perth Indie',
        'Peruvian Rock',
        'Piano Blues',
        'Piano Rock',
        'Piedmont Blues',
        'Pipe Band',
        'Poetry',
        'Polish Hip Hop',
        'Polish Indie',
        'Polish Jazz',
        'Polish Pop',
        'Polish Punk',
        'Polish Reggae',
        'Polka',
        'Polynesian Pop',
        'Polyphony',
        'Pop',
        'Pop Christmas',
        'Pop Emo',
        'Pop House',
        'Pop Punk',
        'Pop Rap',
        'Pop Rock',
        'Popgaze',
        'Porro',
        'Portland Indie',
        'Portuguese Pop',
        'Portuguese Rock',
        'Post Rock',
        'Post-disco',
        'Post-disco Soul',
        'Post-grunge',
        'Post-hardcore',
        'Post-metal',
        'Post-post-hardcore',
        'Post-punk',
        'Power Blues-rock',
        'Power Electronics',
        'Power Metal',
        'Power Noise',
        'Power Pop',
        'Power Violence',
        'Power-pop Punk',
        'Praise',
        'Progressive Alternative',
        'Progressive Bluegrass',
        'Progressive Electro House',
        'Progressive House',
        'Progressive Metal',
        'Progressive Psytrance',
        'Progressive Rock',
        'Progressive Trance',
        'Progressive Trance House',
        'Progressive Uplifting Trance',
        'Protopunk',
        'Psych Gaze',
        'Psychedelic Blues-rock',
        'Psychedelic Rock',
        'Psychedelic Trance',
        'Psychill',
        'Psychobilly',
        'Pub Rock',
        'Puerto Rican Rock',
        'Punjabi',
        'Punk',
        'Punk Blues',
        'Punk Christmas',
        'Punk Ska',
        'Qawwali',
        'Quebecois',
        'Quiet Storm',
        'R&amp;b',
        'Ragga Jungle',
        'Ragtime',
        'Rai',
        'Ranchera',
        'Rap',
        'Rap Metal',
        'Rap Metalcore',
        'Rap Rock',
        'Raw Black Metal',
        'Re:techno',
        'Reading',
        'Rebetiko',
        'Reggae',
        'Reggae Fusion',
        'Reggae Rock',
        'Reggaeton',
        'Regional Mexican',
        'Relaxative',
        'Remix',
        'Renaissance',
        'Retro Electro',
        'Retro Metal',
        'Rhythm And Boogie',
        'Riddim',
        'Rio De La Plata',
        'Riot Grrrl',
        'Rock',
        'Rock Catala',
        'Rock En Espanol',
        'Rock Gaucho',
        'Rock Noise',
        'Rock Steady',
        'Rock-and-roll',
        'Rockabilly',
        'Romanian Pop',
        'Romanian Rock',
        'Romantic',
        'Roots Reggae',
        'Roots Rock',
        'Rumba',
        'Russian Alternative',
        'Russian Hip Hop',
        'Russian Pop',
        'Russian Punk',
        'Russian Rock',
        'Rva Indie',
        'Salsa',
        'Salsa International',
        'Samba',
        'Saxophone',
        'Schlager',
        'Schranz',
        'Scorecore',
        'Scottish Rock',
        'Scratch',
        'Screamo',
        'Screamo Punk',
        'Screamocore',
        'Seattle Indie',
        'Sega',
        'Serialism',
        'Sertanejo',
        'Sertanejo Tradicional',
        'Sertanejo Universitario',
        'Sevdah',
        'Shanty',
        'Sheffield Indie',
        'Shibuya-kei',
        'Shimmer Pop',
        'Shimmer Psych',
        'Shiver Pop',
        'Shoegaze',
        'Show Tunes',
        'Singaporean Pop',
        'Singer-songwriter',
        'Sinhala',
        'Ska',
        'Ska Punk',
        'Ska Revival',
        'Skate Punk',
        'Skiffle',
        'Skinhead Oi',
        'Skinhead Reggae',
        'Skweee',
        'Slam Death Metal',
        'Slash Punk',
        'Slc Indie',
        'Sleaze Rock',
        'Sleep',
        'Slovak Hip Hop',
        'Slovak Pop',
        'Slovenian Rock',
        'Slow Core',
        'Sludge Metal',
        'Smooth Jazz',
        'Smooth Urban R&amp;b',
        'Soca',
        'Soda Pop',
        'Soft Rock',
        'Solipsynthm',
        'Soukous',
        'Soul',
        'Soul Blues',
        'Soul Christmas',
        'Soul Flow',
        'Soul Jazz',
        'Soundtrack',
        'South African Jazz',
        'Southern Gospel',
        'Southern Hip Hop',
        'Southern Rock',
        'Southern Soul',
        'Southern Soul Blues',
        'Space Rock',
        'Spanish Classical',
        'Spanish Folk',
        'Spanish Hip Hop',
        'Spanish Indie Pop',
        'Spanish Indie Rock',
        'Spanish Invasion',
        'Spanish New Wave',
        'Spanish Pop',
        'Spanish Pop Rock',
        'Spanish Punk',
        'Spanish Reggae',
        'Speed Garage',
        'Speed Metal',
        'Speedcore',
        'Spoken Word',
        'Spytrack',
        'Steampunk',
        'Steelpan',
        'Stl Indie',
        'Stomp And Flutter',
        'Stomp And Holler',
        'Stomp And Whittle',
        'Stomp Pop',
        'Stoner Metal',
        'Stoner Rock',
        'Straight Edge',
        'Street Punk',
        'Stride',
        'String Band',
        'String Folk',
        'String Quartet',
        'Substep',
        'Sunset Lounge',
        'Suomi Rock',
        'Surf Music',
        'Swamp Blues',
        'Swamp Pop',
        'Swedish Alternative Rock',
        'Swedish Hard Rock',
        'Swedish Hip Hop',
        'Swedish Indie Pop',
        'Swedish Indie Rock',
        'Swedish Jazz',
        'Swedish Metal',
        'Swedish Pop',
        'Swedish Pop Punk',
        'Swedish Prog',
        'Swedish Punk',
        'Swedish Reggae',
        'Swedish Soft Pop',
        'Swedish Synthpop',
        'Swing',
        'Swirl Psych',
        'Swiss Folk',
        'Swiss Hip Hop',
        'Swiss Rock',
        'Symphonic Black Metal',
        'Symphonic Metal',
        'Symphonic Rock',
        'Synthpop',
        'Taiwanese Pop',
        'Talent Show',
        'Tango',
        'Tech House',
        'Technical Brutal Death Metal',
        'Technical Death Metal',
        'Techno',
        'Teen Pop',
        'Tejano',
        'Tekno',
        'Terrorcore',
        'Texas Blues',
        'Texas Country',
        'Thai Indie',
        'Thai Pop',
        'Thrash Core',
        'Thrash Metal',
        'Thrash-groove Metal',
        'Throat Singing',
        'Tibetan',
        'Tico',
        'Timba',
        'Tin Pan Alley',
        'Traditional Blues',
        'Traditional British Folk',
        'Traditional Country',
        'Traditional Folk',
        'Traditional Funk',
        'Traditional Irish Folk',
        'Traditional Reggae',
        "Traditional Rock 'N Roll",
        'Traditional Rockabilly',
        'Traditional Scottish Folk',
        'Traditional Ska',
        'Traditional Soul',
        'Traditional Swing',
        'Trance',
        'Trance Hop',
        'Trap Music',
        'Trapstep',
        'Trash Rock',
        'Triangle Indie',
        'Tribal House',
        'Tribute',
        'Trip Hop',
        'Tropical',
        'Trova',
        'Turbo Folk',
        'Turkish Alternative',
        'Turkish Classical',
        'Turkish Folk',
        'Turkish Hip Hop',
        'Turkish Jazz',
        'Turkish Pop',
        'Turkish Rock',
        'Turntablism',
        'Twee Indie Pop',
        'Twee Pop',
        'Twin Cities Indie',
        'Tzadik',
        'Uk Dub',
        'Uk Garage',
        'Uk Hip Hop',
        'Uk Post-punk',
        'Ukrainian Rock',
        'Ukulele',
        'Unblack Metal',
        'Underground Hip Hop',
        'Underground Latin Hip Hop',
        'Underground Pop Rap',
        'Underground Power Pop',
        'Underground Rap',
        'Uplifting Trance',
        'Urban Contemporary',
        'Vallenato',
        'Vancouver Indie',
        'Vapor House',
        'Vaporwave',
        'Vegan Straight Edge',
        'Vegas Indie',
        'Velha Guarda',
        'Venezuelan Rock',
        'Video Game Music',
        'Vienna Indie',
        'Vietnamese Pop',
        'Viking Metal',
        'Vintage Chanson',
        'Vintage Country Folk',
        'Vintage Gospel',
        'Vintage Jazz',
        'Vintage Reggae',
        'Vintage Rockabilly',
        'Vintage Schlager',
        'Vintage Swedish Pop',
        'Vintage Swing',
        'Vintage Swoon',
        'Vintage Tango',
        'Vintage Western',
        'Violin',
        'Viral Pop',
        'Visual Kei',
        'Vocal House',
        'Vocal Jazz',
        'Vocaloid',
        'Volksmusik',
        'Warm Drone',
        'Welsh Rock',
        'West African Jazz',
        'West Coast Rap',
        'Western Swing',
        'Wind Ensemble',
        'Witch House',
        'Wonky',
        'Workout',
        'World',
        'World Chill',
        'World Christmas',
        'World Fusion',
        'Worship',
        'Wrestling',
        'Wrock',
        'Ye Ye',
        'Yoik',
        'Yugoslav Rock',
        'Zeuhl',
        'Zillertal',
        'Zim',
        'Zolo',
        'Zouglou',
        'Zouk',
        'Zydeco'
      ]
    >;
    spotify_url: Attribute.String;
    apple_music_url: Attribute.String;
    tidal_url: Attribute.String;
    slug: Attribute.UID<'api::artist.artist', 'name'>;
    albums: Attribute.Relation<
      'api::artist.artist',
      'manyToMany',
      'api::album.album'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::artist.artist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::artist.artist',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaCategoria extends Schema.CollectionType {
  collectionName: 'categorias';
  info: {
    singularName: 'categoria';
    pluralName: 'categorias';
    displayName: 'Categoria';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.UID;
    product: Attribute.Relation<
      'api::categoria.categoria',
      'oneToOne',
      'api::product.product'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria.categoria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria.categoria',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    slug: Attribute.UID<'api::product.product', 'name'>;
    precio: Attribute.Integer;
    releaseDate: Attribute.Date;
    album: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::album.album'
    >;
    Estado: Attribute.Enumeration<['Nuevo', 'Usado']>;
    Descripcion: Attribute.RichText;
    Habilitado: Attribute.Boolean;
    Stock: Attribute.Integer;
    Tipo: Attribute.Enumeration<
      [
        'Vinilo',
        'CD',
        'Cassette',
        'DVD',
        'Libro',
        'Ropa',
        'Electr\u00F3nica',
        'Accesorio',
        'Repuesto',
        'Otro'
      ]
    >;
    estadoDisco: Attribute.Enumeration<
      ['Mint', 'NearMint', 'Very Good Plus', 'Very Good', 'Poor Fair', 'Nuevo']
    >;
    categoria: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'api::categoria.categoria'
    >;
    multimedia: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    isFeatured: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::album.album': ApiAlbumAlbum;
      'api::artist.artist': ApiArtistArtist;
      'api::categoria.categoria': ApiCategoriaCategoria;
      'api::product.product': ApiProductProduct;
    }
  }
}
