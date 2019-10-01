import { ApiDocsInterface, DOCS_PAGED_RESPONSE } from '@clash/common';
import { GameOption } from '../modules/game/dtos/game-option.dto';
import { GamePagedResponse } from '../modules/game/dtos/game-paged-response.dto';
import { Game } from '../modules/game/dtos/game.dto';
import { MatchTeamMember } from '../modules/match-team/dtos/match-team-member.dto';
import { MatchTeam } from '../modules/match-team/dtos/match-team.dto';
import { MatchFindOptions } from '../modules/match/dtos/match-find-options.dto';
import { Match } from '../modules/match/dtos/match.dto';
import { MatchStatusType } from '../modules/match/enums/match-status.type';
import { MatchType } from '../modules/match/enums/match.type';
import { SeasonCreate } from '../modules/season/dtos/season-create.dto';
import { SeasonDetailed } from '../modules/season/dtos/season-detailed.dto';
import { SeasonOption } from '../modules/season/dtos/season-option.dto';
import { SeasonUpdate } from '../modules/season/dtos/season-update.dto';
import { UserFindOptions } from '../modules/user/dtos/user-find-options.dto';
import { UserPagedResponse } from '../modules/user/dtos/user-paged-response.dto';
import { User } from '../modules/user/dtos/user.dto';
import { UsernameHistory } from '../modules/user/dtos/username-history.dto';

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
    seasons: {
      description: ''
    },
    currentSeason: {
      description: 'Current season of the game'
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
      description: ''
    },
    fromDate: {
      description: ''
    },
    toDate: {
      description: ''
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
      description: ''
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
