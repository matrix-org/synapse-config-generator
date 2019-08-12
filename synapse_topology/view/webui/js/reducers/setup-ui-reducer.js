import { ADVANCE_UI, BACK_UI, BASE_CONFIG_CHECKED } from '../actions/types';

import {
  SETUP_INTRO_UI,
  SERVER_NAME_UI,
  STATS_REPORT_UI,
  KEY_EXPORT_UI,
  DELEGATION_OPTIONS_UI,
  DELEGATION_SERVER_NAME_UI,
  WELL_KNOWN_UI,
  DNS_UI,
  TLS_UI,
  REVERSE_PROXY_UI,
  PORT_SELECTION_UI,
  REVERSE_PROXY_TEMPLATE_UI,
  TLS_CERTPATH_UI,
  DELEGATION_PORT_SELECTION_UI,
  DELEGATION_TEMPLATE_UI,
  DATABASE_UI,
} from './ui_constants';

import {
  DELEGATION_TYPES, TLS_TYPES
} from '../actions/constants';

export default ({ setup_ui, base_config }, action) => {
  if (!base_config.base_config_checked) {
    return setup_ui;
  }
  if (base_config.setup_done) {
    return setup_ui;
  }
  switch (action.type) {
    case ADVANCE_UI:
      return {
        active_blocks: [
          ...setup_ui.active_blocks,
          forward_mapping(
            setup_ui.active_blocks[setup_ui.active_blocks.length - 1]
          ),
        ]
      }

    // TODO: Think about how back should work..
    case BACK_UI:
      switch (ui.active_ui) {
        case STATS_REPORT_UI:
          return SERVER_NAME_UI;
        case KEY_EXPORT_UI:
          return STATS_REPORT_UI;
        case DELEGATION_OPTIONS_UI:
          return KEY_EXPORT_UI;
        case WELL_KNOWN_UI:
          return DELEGATION_OPTIONS_UI;
        case DNS_UI:
          return WELL_KNOWN_UI;
        default:
          SETUP_INTRO_UI;
      }
    default:
      return ui.active_ui;
  }
}

const forward_mapping = (current_ui, action) => {
  switch (current_ui) {
    case SETUP_INTRO_UI:
      return SERVER_NAME_UI;
    case SERVER_NAME_UI:
      return STATS_REPORT_UI;
    case STATS_REPORT_UI:
      return KEY_EXPORT_UI;
    case KEY_EXPORT_UI:
      return DELEGATION_OPTIONS_UI;
    case DELEGATION_OPTIONS_UI:
      switch (action.option) {
        // TODO: figure these out
        case DELEGATION_TYPES.DNS:
          return DELEGATION_SERVER_NAME_UI;
        case DELEGATION_TYPES.WELL_KNOWN:
          return DELEGATION_SERVER_NAME_UI;
        case DELEGATION_TYPES.LOCAL:
          return TLS_UI;
      }
    case DELEGATION_SERVER_NAME_UI:
      return DELEGATION_PORT_SELECTION_UI;
    case DELEGATION_PORT_SELECTION_UI:
      return TLS_UI;
    case TLS_UI:
      switch (action.option) {
        case TLS_TYPES.ACME:
          return PORT_SELECTION_UI;
        case TLS_TYPES.TLS:
          return TLS_CERTPATH_UI;
        case TLS_TYPES.NONE:
          return PORT_SELECTION_UI;
        case TLS_TYPES.REVERSE_PROXY:
          return REVERSE_PROXY_UI;
      }
    case REVERSE_PROXY_UI:
      return PORT_SELECTION_UI;
    case TLS_CERTPATH_UI:
      return PORT_SELECTION_UI;
    case PORT_SELECTION_UI:
      return base_config.tls == TLS_TYPES.REVERSE_PROXY ?
        REVERSE_PROXY_TEMPLATE_UI :
        base_config.delegation_type != DELEGATION_TYPES.LOCAL ?
          DELEGATION_TEMPLATE_UI :
          DATABASE_UI;
    case REVERSE_PROXY_TEMPLATE_UI:
      return base_config.delegation_type != DELEGATION_TYPES.LOCAL ?
        DELEGATION_TEMPLATE_UI :
        DATABASE_UI;
    case DELEGATION_TEMPLATE_UI:
      return DATABASE_UI;
    case WELL_KNOWN_UI:
    case DNS_UI:
    default:
      return SETUP_INTRO_UI;
  }
}
