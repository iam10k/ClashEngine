import { AuthResponse, AuthToken } from '../dtos/auth';
import { FilterOptions, PagedResponseMeta, PaginationOptions } from '../dtos/core';
import { UserDetail } from '../dtos/user';
import { Order } from '../enums';
import { ApiDocsInterface } from '../interfaces';

export const DOCS_PAGINATION_OPTIONS: ApiDocsInterface<PaginationOptions> = {
  PROPS: {
    order: {
      description: '',
      enum: [Order.ASC, Order.DESC],
      default: Order.ASC
    },
    page: {
      description: '',
      type: 'integer',
      minimum: 1,
      default: 1
    },
    pageSize: {
      description: '',
      type: 'integer',
      minimum: 1,
      maximum: 200,
      default: 25
    }
  }
};

export const DOCS_FILTER_OPTIONS: ApiDocsInterface<FilterOptions> = {
  PROPS: {
    q: {
      description: '',
      type: 'string',
      minLength: 1
    }
  }
};

export const DOCS_PAGED_RESPONSE_META: ApiDocsInterface<PagedResponseMeta> = {
  PROPS: {
    ...DOCS_PAGINATION_OPTIONS.PROPS,
    hasNextPage: {
      description: ''
    }
  }
};

export const DOCS_PAGED_RESPONSE: ApiDocsInterface<{ meta: PagedResponseMeta }> = {
  PROPS: {
    meta: {
      description: ''
    }
  }
};

export const DOCS_AUTH_RESPONSE: ApiDocsInterface<AuthResponse> = {
  PROPS: {
    accessToken: {
      description: '',
      type: 'string'
    },
    user: {
      description: ''
    }
  }
};

export const DOCS_AUTH_TOKEN: ApiDocsInterface<AuthToken> = {
  PROPS: {
    token: {
      description: '',
      type: 'string'
    },
    expires: {
      description: ''
    },
    fresh: {
      description: ''
    }
  }
};

export const DOCS_USER_DETAIL: ApiDocsInterface<UserDetail> = {
  PROPS: {
    username: {
      description: '',
      type: 'string',
      maxLength: 24,
      minLength: 2
    },
    discordId: {
      description: '',
      type: 'string'
    },
    avatar: {
      description: ''
    },
    email: {
      description: '',
      type: 'string'
    },
    registered: {
      description: '',
      type: 'boolean'
    },
    flags: {
      description: '',
      nullable: true,
      type: 'number'
    },
    roles: {
      description: '',
      nullable: true,
      type: 'number'
    }
  }
};
