import { articlesByAuthor } from './author-articles'
import { combineReducers } from 'redux'
import { post, posts } from './posts'
import { searchedAuthorsList, authorsList } from './authors'
import { topic, topics } from './topics'
import authReducer from './auth'
import bookmarks from './bookmarks'
import bookmarkWidget from './bookmark-widget'
import entities from './entities'
import indexPage from './index-page'
import origins from './origins'
import reduxStatePropKey from '../constants/redux-state-field-names'
import settings from './settings'
import types from '../constants/action-types'
// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

/**
 *  Mongodb ObjectID type definition
 *  @typedef {string} ObjectID
 */

/**
 *  Slug type defintion
 *  @typedef {string} Slug
 */

/**
 * ResizedTarget type definition
 * @typedef {Object} ResizedTarget
 * @property {string} url
 * @property {number} height
 * @property {number} width
 */

/**
 *  Image type definition
 *  @typedef {Object} Image
 *  @property {string} id
 *  @property {string} description
 *  @property {string} copyright
 *  @property {string} filetype
 *  @property {number} height
 *  @property {number} width
 *  @property {string} url
 *  @property {Object} resized_targets
 *  @property {ResizedTarget} resized_targets.tiny
 *  @property {ResizedTarget} resized_targets.w400
 *  @property {ResizedTarget} resized_targets.mobile
 *  @property {ResizedTarget} resized_targets.tablet
 *  @property {ResizedTarget} resized_targets.desktop
 */

/**
 *  Tag type definition
 *  @typedef {Object} Tag
 *  @property {string} id
 *  @property {string} name
 */

/**
 *  Category type definition
 *  @typedef {Object} Category
 *  @property {string} id
 *  @property {string} name
 *  @property {number} sort_order
 */

/**
 *  Author type definition
 *  @typedef {Object} Author
 *  @property {string} id
 *  @property {string} name
 *  @property {string} job_title
 */

/**
 *  Post type definition
 *  @typedef {Object} Post
 *  @property {Category[]} categories
 *  @property {Image} hero_image
 *  @property {Image} leading_image_portrait
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {Tag[]} tags
 *  @property {bool} full
 *  @property {bool} is_external
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} published_date
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 */

/**
 *  Topic type definition
 *  @typedef {Object} Topic
 *  @property {Image} leading_image
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {bool} full
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} title
 *  @property {string} topic_name
 *  @property {string} updated_at
 */

/**
 *  FullTopic type definition
 *  @typedef {Object} FullTopic
 *  @property {Image} leading_image
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {bool} full
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} title
 *  @property {string} topic_name
 *  @property {string} updated_at
 *
 *  @property {Object[]} description.api_data
 *  @property {Object[]} team_description.api_data
 *  @property {Object} description
 *  @property {Object} leading_video
 *  @property {Object} team_description
 *  @property {ObjectID[]} relateds - slugs of related posts
 *  @property {string} headline
 *  @property {string} og_title
 *  @property {string} published_date
 *  @property {string} relateds_background
 *  @property {string} relateds_format
 *  @property {string} subtitle
 *  @property {string} title_position
 */

/**
 *  FullPost type definition
 *  @typedef {Object} FullPost
 *  @property {Category[]} categories
 *  @property {Image} hero_image
 *  @property {Image} leading_image_portrait
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {Tag[]} tags
 *  @property {bool} full
 *  @property {bool} is_external
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} published_date
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 *
 *  @property {Author[]} designers
 *  @property {Author[]} engineers
 *  @property {Author[]} photographers
 *  @property {Author[]} writters
 *  @property {Object} topics
 *  @property {ObjectID[]} topics.relateds
 *  @property {string} topics.slug
 *  @property {string} topics.title
 *  @property {string} topics.topic_name
 *  @property {Object[]} brief.api_data
 *  @property {Object[]} content.api_data
 *  @property {Object} brief
 *  @property {Object} content
 *  @property {Post[]} relateds
 *  @property {string} copyright
 *  @property {string} extend_byline
 *  @property {string} hero_image_size
 *  @property {string} leading_image_description
 *  @property {string} og_title
 *  @property {string} updated_at
 */

/**
 *  PostList type definition
 *  @typedef {Object} PostList
 *  @property {Object.<number, number[]>} pages - Page to item positions. Ex: `1: [0, 9]`, which means items[0] - items[9] are for page 1
 *  @property {Object} error
 *  @property {number} total
 *  @property {ObjectID[]} items
 */

/**
 *  TopicList type definition
 *  @typedef {Object} TopicList
 *  @property {bool} isFetching
 *  @property {Object.<number, ObjectID[]>} items - Page to objectID. Ex: `1: ['id_1', 'id_2']`, which means page 1 having 'id_1' and 'id_2' entities
 *  @property {number} totalPages
 *  @property {number} page
 *  @property {number} nPerPage
 */

/**
 *  PostEntity type definition
 *  @typedef {Object} PostEnitity
 *  @property {Object.<ObjectID, Post|FullPost>} byId
 *  @property {ObjectID[]} allIds
 *  @property {Object.<Slug, ObjectID>} slugToId
 */

/**
 *  TopicEntity type definition
 *  @typedef {Object} TopicEntity
 *  @property {Object.<ObjectID, Topic|FullTopic>} byId
 *  @property {ObjectID[]} allIds
 *  @property {Object.<Slug, ObjectID>} slugToId
 */

/**
 *  ReduxState type definition
 *  @typedef {Object} ReduxState
 *
 *  @property {Object} entities
 *  @property {PostEntity} entities.posts
 *  @property {TopicEntity} entities.topics
 *
 *  @property {Object} index_page
 *  @property {Object} index_page.error
 *  @property {bool} index_page.isFetching
 *  @property {ObjectID[]} index_page.culture_and_art
 *  @property {ObjectID[]} index_page.editor_picks_section
 *  @property {ObjectID[]} index_page.environment_and_education
 *  @property {ObjectID[]} index_page.hime_right_and_society
 *  @property {ObjectID[]} index_page.infgraphics_section
 *  @property {ObjectID[]} index_page.international
 *  @property {ObjectID[]} index_page.latest_section
 *  @property {ObjectID[]} index_page.latest_topic_section
 *  @property {ObjectID[]} index_page.living_and_medical_care
 *  @property {ObjectID[]} index_page.photos_section
 *  @property {ObjectID[]} index_page.politics_and_economy
 *  @property {ObjectID[]} index_page.reviews_section
 *  @property {ObjectID[]} index_page.topics_section
 *
 *  @property {Object} selected_post
 *  @property {Object} selected_post.error
 *  @property {Slug} selected_post.slug
 *  @property {bool} selected_post.isFetching
 *
 *  @property {Object} selected_topic
 *  @property {Object} selected_topic.error
 *  @property {Slug} selected_topic.slug
 *  @property {bool} selected_topic.isFetching
 *
 *  @property {Object} lists
 *  @property {Object.<ObjectID, PostList>}
 *
 *  @property {TopicList} topic_list
 *
 *  @property {Object} articlesByAuthor
 *  @property {Object} auth
 *  @property {Object} authorsList
 *  @property {Object} bookmarkWidget
 *  @property {Object} bookmarks
 *  @property {Object} enititiesForAuthors
 *  @property {Object} origins
 *  @property {Object} searchedAuthorsList
 *  @property {number} nextNotifyPopupTS
 */

const rootReducer = combineReducers({
  [reduxStatePropKey.articlesByAuthor]: articlesByAuthor,
  [reduxStatePropKey.auth]: authReducer,
  [reduxStatePropKey.authorsList]: authorsList,
  [reduxStatePropKey.bookmarks]: bookmarks,
  [reduxStatePropKey.bookmarkWidget]: bookmarkWidget,
  [reduxStatePropKey.entities]: entities,
  /*
   entities: {
      topics: {},
      posts: {
        byId: {
          post1_id: {
            id: 'post1_id',
            slug: 'post1_slug',
            full: true,
            // `relateds` and `topics` exists because of `full: true`
            relateds: ['post3_id'],
            topics: {
              topic_name: '',
              slug: 'topic1_slug',
              id: 'topic1_id',
              relateds: ['post1_id', 'post2_id']
            }
            ...
          },
          post2_id: {
            id: 'post2_id',
            slug: 'post2_slug',
            full: false,
            ...
          }
        },
        allIds: [post1_id, post2_id],
        slugToId: {
          post1_slug: 'post1_id',
          post2_slug: 'post2_id'
        }
      },
    }
  */

  [reduxStatePropKey.indexPage]: indexPage,
  [reduxStatePropKey.lists]: posts,
  [reduxStatePropKey.searchedAuthorsList]: searchedAuthorsList,
  [reduxStatePropKey.selectedPost]: post,
  [reduxStatePropKey.selectedTopic]: topic,
  [reduxStatePropKey.topicList]: topics,
  [reduxStatePropKey.entitiesForAuthors]: (state = {}, action) => {
    const entities = _.get(action, 'payload.normalizedData.entities')
    if (entities) {
      // WORKAROUND:
      // When the data of an author is updated, we have not build the function to synchronize the author data saved in old post records on Algolia.
      // So the author data in post records that already existed will be outdated.
      // The temporarily solution is that we do not update authors in entities when fetching articles of an author.
      if (action.type === types.FETCH_AUTHOR_COLLECTION_SUCCESS) {
        return _.merge({}, state, { articles: entities.articles })
      }
      return _.merge({}, state, entities)
    }
    return state
  },
  [reduxStatePropKey.nextNotifyPopupTS]: (state = 0, action) => {
    if (action.type === types.SET_NEXT_POPUP_TIME_STAMP) {
      return action.payload
    }
    return state
  },
  [reduxStatePropKey.origins]: origins,
  [reduxStatePropKey.settings]: settings,
})

export default rootReducer
