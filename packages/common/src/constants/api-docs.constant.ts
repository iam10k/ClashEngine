import { AuthResponse, AuthToken } from '../dtos/auth';
import { FilterOptions, PagedResponseMeta, PaginationOptions } from '../dtos/core';
import { Game, GameOption, GamePagedResponse } from '../dtos/game';
import { Match, MatchFindOptions } from '../dtos/match';
import { MatchTeam, MatchTeamCreate, MatchTeamMember } from '../dtos/match-team';
import { Queue, QueueDetailed } from '../dtos/queue';
import { Region } from '../dtos/region';
import { SeasonCreate, SeasonDetailed, SeasonOption, SeasonUpdate } from '../dtos/season';
import { User, UserDetail, UserFindOptions, UsernameHistory, UserPagedResponse } from '../dtos/user';
import { MatchStatusType, MatchType, Order } from '../enums';
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
      description: ''
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
      description: '',
      type: 'string',
      format: 'date-time'
    },
    fresh: {
      description: '',
      type: 'boolean'
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
      description: '',
      type: 'string'
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

export const DOCS_USER: ApiDocsInterface<User> = {
  PROPS: {
    teams: {
      description: ''
    },
    usernameHistory: {
      description: ''
    }
  }
};

export const DOCS_USERNAME_HISTORY: ApiDocsInterface<UsernameHistory> = {
  PROPS: {
    username: {
      description: ''
    }
  }
};

export const DOCS_USER_FIND_OPTIONS: ApiDocsInterface<UserFindOptions> = {
  PROPS: {
    discordId: {
      description: ''
    }
  }
};

export const DOCS_USER_PAGED_RESPONSE: ApiDocsInterface<UserPagedResponse> = {
  PROPS: {
    records: {
      description: ''
    },
    meta: DOCS_PAGED_RESPONSE.PROPS.meta
  }
};

export const DOCS_GAME: ApiDocsInterface<Game> = {
  PATH: {
    id: {
      name: 'gameId'
    }
  },
  PROPS: {
    name: {
      description: '',
      type: 'string',
      minLength: 3,
      maxLength: 64
    },
    inactive: {
      description: '',
      type: 'boolean'
    },
    image: {
      description: '',
      type: 'string'
    },
    currentSeason: {
      description: 'Current season of the game'
    },
    teamCount: {
      description: '',
      type: 'integer'
    },
    teamPlayers: {
      description: '',
      type: 'integer'
    }
  }
};

export const DOCS_GAME_PAGED_RESPONSE: ApiDocsInterface<GamePagedResponse> = {
  PROPS: {
    records: {
      description: ''
    },
    meta: DOCS_PAGED_RESPONSE.PROPS.meta
  }
};

export const DOCS_GAME_OPTION: ApiDocsInterface<GameOption> = {
  PROPS: {
    configOption: {
      description: ''
    },
    required: {
      description: '',
      type: 'boolean',
      default: false
    },
    default: {
      description: '',
      type: 'string'
    }
  }
};

export const DOCS_SEASON: ApiDocsInterface<SeasonDetailed> = {
  PATH: {
    id: {
      name: 'seasonId',
      description: ''
    }
  },
  PROPS: {
    season: {
      description: '',
      type: 'integer'
    },
    game: {
      description: ''
    },
    name: {
      description: '',
      type: 'string',
      minLength: 3,
      maxLength: 64
    },
    startDate: {
      description: '',
      type: 'string',
      format: 'date-time'
    },
    endDate: {
      description: '',
      type: 'string',
      format: 'date-time'
    },
    options: {
      description: ''
    }
  }
};

export const DOCS_SEASON_CRE_UPD: ApiDocsInterface<SeasonCreate | SeasonUpdate> = {
  PROPS: {
    startDate: {
      description: '',
      type: 'string',
      format: 'date'
    },
    endDate: {
      description: '',
      type: 'string',
      format: 'date'
    }
  }
};

export const DOCS_SEASON_OPTION: ApiDocsInterface<SeasonOption> = {
  PROPS: {
    configOption: {
      description: ''
    },
    value: {
      description: '',
      type: 'string'
    }
  }
};

export const DOCS_MATCH: ApiDocsInterface<Match> = {
  PROPS: {
    seasonId: {
      description: '',
      type: 'integer'
    },
    regionKey: {
      description: '',
      type: 'string'
    },
    type: {
      description: '',
      enum: [MatchType.PICKUP, MatchType.WAGER, MatchType.SCRIM],
      type: 'string'
    },
    status: {
      description: '',
      enum: [MatchStatusType.PENDING, MatchStatusType.ACTIVE, MatchStatusType.ENDED, MatchStatusType.CANCELLED],
      type: 'string'
    },
    winnerId: {
      description: '',
      type: 'integer'
    },
    teams: {
      description: ''
    },
    createdAt: {
      description: '',
      type: 'string',
      format: 'date-time'
    }
  }
};

export const DOCS_MATCH_FIND_OPTIONS: ApiDocsInterface<MatchFindOptions> = {
  PROPS: {
    seasonId: {
      description: '',
      type: 'integer'
    },
    fromDate: {
      description: '',
      type: 'string',
      format: 'date'
    },
    toDate: {
      description: '',
      type: 'string',
      format: 'date'
    },
    type: {
      ...DOCS_MATCH.PROPS.type,
      format: 'enum',
      isArray: true,
      validateEach: true
    },
    status: {
      ...DOCS_MATCH.PROPS.status,
      format: 'enum',
      isArray: true,
      validateEach: true
    }
  }
};

export const DOCS_MATCH_TEAM: ApiDocsInterface<MatchTeam> = {
  PROPS: {
    members: {
      description: ''
    },
    score: {
      description: '',
      type: 'integer'
    },
    elo: {
      description: '',
      type: 'number',
      format: 'double'
    },
    adjustedElo: {
      description: '',
      type: 'number',
      format: 'double'
    }
  }
};

export const DOCS_MATCH_TEAM_CREATE: ApiDocsInterface<MatchTeamCreate> = {
  PROPS: {
    members: {
      description: '',
      type: 'integer',
      isArray: true
    }
  }
};

export const DOCS_MATCH_TEAM_MEMBER: ApiDocsInterface<MatchTeamMember> = {
  PROPS: {
    user: {
      description: ''
    }
  }
};

export const DOCS_QUEUE: ApiDocsInterface<Queue> = {
  PROPS: {
    gameId: {
      description: '',
      type: 'integer'
    },
    regionKey: {
      description: '',
      type: 'string'
    },
    enabled: {
      description: '',
      type: 'boolean'
    }
  }
};

export const DOCS_QUEUE_DETAILED: ApiDocsInterface<QueueDetailed> = {
  PROPS: {
    game: {
      description: ''
    },
    region: {
      description: ''
    },
    enabled: {
      description: '',
      type: 'boolean'
    },
    players: {
      description: ''
    }
  }
};

export const DOCS_REGION: ApiDocsInterface<Region> = {
  PROPS: {
    key: {
      description: '',
      type: 'string'
    },
    name: {
      description: '',
      type: 'string'
    },
    iso2: {
      description: '',
      type: 'string'
    },
    enabled: {
      description: '',
      type: 'boolean'
    }
  }
};
