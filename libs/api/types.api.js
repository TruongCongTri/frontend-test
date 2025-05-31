// AUTH
/**
 * @typedef {Object} CreateCodePayload
 * @property {string} phone_number
 *
 * @typedef {Object} ValidateCodePayload
 * @property {string} phone_number
 * @property {string} access_code
 *
 * @typedef {Object} ValidateCodeResponse
 * @property {{ success: boolean, message: string }} meta
 */

// GITHUB
/**
 * @typedef {Object} SearchParams
 * @property {string} q
 * @property {number} [page]
 * @property {number} [per_page]
 *
 * @typedef {Object} GithubUser
 * @property {string} login
 * @property {number} id
 * @property {string} avatar_url
 * @property {string} html_url
 * @property {string} repos_url
 * @property {number} followers
 * @property {number} following
 *
 * @typedef {Object} Pagination
 * @property {number} current_page
 * @property {number} per_page
 * @property {number} total
 * @property {number} total_pages
 *
 * @typedef {Object} SearchResponse
 * @property {{ users: GithubUser[] }} data
 * @property {{ pagination: Pagination, success: boolean, message: string }} meta
 */

// USER
/**
 * @typedef {Object} LikeGithubUserPayload
 * @property {string} phone_number
 * @property {number} github_user_id
 *
 * @typedef {Object} LikedPayload
 * @property {string} phone_number
 * @property {number[]} favorite_github_ids
 *
 * @typedef {Object} UserProfile
 * @property {string} phone_number
 * @property {GithubUser[]} favorite_github_users
 *
 * @typedef {Object} GetUserProfileResponse
 * @property {{ user: UserProfile }} data
 * @property {{ success: boolean, message: string }} meta
//  *
//  * @typedef {Object} GetLikeGithubResponse
//  * @property {{ user: LikedPayload }} data
//  * @property {{ success: boolean, message: string }} meta
 */
