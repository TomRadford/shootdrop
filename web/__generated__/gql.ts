/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n\tfragment UserDetails on User {\n\t\tid\n\t\tusername\n\t\tfullName\n\t\tprofilePicture\n\t}\n": types.UserDetailsFragmentDoc,
    "\n\tfragment GearItemDetails on GearItem {\n\t\tid\n\t\tcategory\n\t\tmanufacturer\n\t\tmodel\n\t\tdescription\n\t\tproductURL\n\t\timages {\n\t\t\tid\n\t\t\turl\n\t\t\twidth\n\t\t\theight\n\t\t}\n\t\tallPrefs {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.GearItemDetailsFragmentDoc,
    "\n\tfragment ListDetails on GearList {\n\t\tid\n\t\tcategory\n\t\tcomment\n\t\tdrop {\n\t\t\tid\n\t\t\tproject\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdatedAt\n\t}\n": types.ListDetailsFragmentDoc,
    "\n\tmutation login($username: String!, $password: String!) {\n\t\tlogin(username: $username, password: $password) {\n\t\t\tvalue\n\t\t}\n\t}\n": types.LoginDocument,
    "\n\tmutation passwordReset($username: String!) {\n\t\tpasswordReset(username: $username)\n\t}\n": types.PasswordResetDocument,
    "\n\tmutation createUser(\n\t\t$fullName: String!\n\t\t$username: String!\n\t\t$password: String!\n\t\t$captchaToken: String!\n\t) {\n\t\tcreateUser(\n\t\t\tfullName: $fullName\n\t\t\tusername: $username\n\t\t\tpassword: $password\n\t\t\tcaptchaToken: $captchaToken\n\t\t) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n": types.CreateUserDocument,
    "\n\tmutation editMe(\n\t\t$username: String\n\t\t$password: String\n\t\t$profilePicture: String\n\t\t$fullName: String\n\t) {\n\t\teditMe(\n\t\t\tusername: $username\n\t\t\tpassword: $password\n\t\t\tprofilePicture: $profilePicture\n\t\t\tfullName: $fullName\n\t\t) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n": types.EditMeDocument,
    "\n\tfragment DropDetails on Drop {\n\t\tid\n\t\tproject\n\t\tclient\n\t\tdirector\n\t\tdop\n\t\tsoundie\n\t\tgearCheckDate\n\t\tstartDate\n\t\tendDate\n\t\twrapDate\n\t\tupdatedAt\n\t\tusers {\n\t\t\t...UserDetails\n\t\t}\n\t\tlists {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n\t\n": types.DropDetailsFragmentDoc,
    "\n\tquery allDrops($drop: String!) {\n\t\tallDrops(drop: $drop) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\t\n": types.AllDropsDocument,
    "\n\tquery allUsers($fullName: String) {\n\t\tallUsers(fullName: $fullName) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n": types.AllUsersDocument,
    "\n\tmutation addDrop($project: String!, $client: String) {\n\t\taddDrop(project: $project, client: $client) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\n\t\n": types.AddDropDocument,
    "\n\tmutation updateDrop(\n\t\t$id: String!\n\t\t$project: String\n\t\t$client: String\n\t\t$director: String\n\t\t$dop: String\n\t\t$soundie: String\n\t\t$gearCheckDate: Date\n\t\t$startDate: Date\n\t\t$endDate: Date\n\t\t$wrapDate: Date\n\t\t$users: [String]\n\t) {\n\t\tupdateDrop(\n\t\t\tid: $id\n\t\t\tproject: $project\n\t\t\tclient: $client\n\t\t\tdirector: $director\n\t\t\tdop: $dop\n\t\t\tsoundie: $soundie\n\t\t\tgearCheckDate: $gearCheckDate\n\t\t\tstartDate: $startDate\n\t\t\tendDate: $endDate\n\t\t\twrapDate: $wrapDate\n\t\t\tusers: $users\n\t\t) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\t\n": types.UpdateDropDocument,
    "\n\tquery allGearItems(\n\t\t$id: String\n\t\t$category: GearCategory\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$tags: [String]\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$random: Boolean\n\t) {\n\t\tallGearItems(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\ttags: $tags\n\t\t\toffset: $offset\n\t\t\tlimit: $limit\n\t\t\trandom: $random\n\t\t) {\n\t\t\ttotalDocs\n\t\t\tgearItems {\n\t\t\t\t...GearItemDetails\n\t\t\t}\n\t\t}\n\t}\n\t\n": types.AllGearItemsDocument,
    "\n\tquery randomGearItems(\n\t\t$id: String\n\t\t$category: GearCategory\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$tags: [String]\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$random: Boolean\n\t) {\n\t\tallGearItems(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\ttags: $tags\n\t\t\toffset: $offset\n\t\t\tlimit: $limit\n\t\t\trandom: $random\n\t\t) {\n\t\t\tgearItems {\n\t\t\t\tid\n\t\t\t\tcategory\n\t\t\t\tmanufacturer\n\t\t\t\tmodel\n\t\t\t\tdescription\n\t\t\t\tproductURL\n\t\t\t\timages {\n\t\t\t\t\tid\n\t\t\t\t\turl\n\t\t\t\t\twidth\n\t\t\t\t\theight\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.RandomGearItemsDocument,
    "\n\tmutation addGearItem(\n\t\t$category: [GearCategory!]\n\t\t$manufacturer: String!\n\t\t$model: String!\n\t) {\n\t\taddGearItem(\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t) {\n\t\t\t...GearItemDetails\n\t\t}\n\t}\n\t\n": types.AddGearItemDocument,
    "\n\tmutation editGearItem(\n\t\t$id: String!\n\t\t$category: [GearCategory]\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$description: String\n\t\t$productURL: String\n\t\t$tags: [String]\n\t\t$prefs: [GearPrefInput]\n\t) {\n\t\teditGearItem(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\tdescription: $description\n\t\t\tproductURL: $productURL\n\t\t\ttags: $tags\n\t\t\tprefs: $prefs\n\t\t) {\n\t\t\t...GearItemDetails\n\t\t}\n\t}\n\t\n": types.EditGearItemDocument,
    "\n\tmutation addGearPref($gearItem: String!) {\n\t\taddGearPref(gearItem: $gearItem) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.AddGearPrefDocument,
    "\n\tmutation editGearPref($id: String!, $name: String!) {\n\t\teditGearPref(id: $id, name: $name) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.EditGearPrefDocument,
    "\n\tmutation removeGearPref($id: String!, $gearItem: String!) {\n\t\tremoveGearPref(id: $id, gearItem: $gearItem)\n\t}\n": types.RemoveGearPrefDocument,
    "\n\tmutation addGearPrefOpt($gearPref: String!) {\n\t\taddGearPrefOpt(gearPref: $gearPref) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.AddGearPrefOptDocument,
    "\n\tmutation removeGearPrefOpt($gearPref: String!, $id: String!) {\n\t\tremoveGearPrefOpt(gearPref: $gearPref, id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n": types.RemoveGearPrefOptDocument,
    "\n\tmutation editGearPrefOpt($id: String!, $name: String!) {\n\t\teditGearPrefOpt(id: $id, name: $name) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n": types.EditGearPrefOptDocument,
    "\n\tmutation addGearImage(\n\t\t$gearItem: String!\n\t\t$url: String!\n\t\t$width: Int\n\t\t$height: Int\n\t) {\n\t\taddGearImage(\n\t\t\tgearItem: $gearItem\n\t\t\turl: $url\n\t\t\twidth: $width\n\t\t\theight: $height\n\t\t) {\n\t\t\tid\n\t\t\turl\n\t\t\twidth\n\t\t\theight\n\t\t}\n\t}\n": types.AddGearImageDocument,
    "\n\tmutation removeGearImage($id: String!, $gearItem: String!) {\n\t\tremoveGearImage(id: $id, gearItem: $gearItem)\n\t}\n": types.RemoveGearImageDocument,
    "\n\tquery allTags($tags: [String], $tag: String, $category: [GearCategory]) {\n\t\tallTags(tags: $tags, tag: $tag, category: $category) {\n\t\t\tid\n\t\t\tname\n\t\t\tcategory\n\t\t}\n\t}\n": types.AllTagsDocument,
    "\n\tmutation addTag($name: String!, $category: [GearCategory]) {\n\t\taddTag(name: $name, category: $category) {\n\t\t\tid\n\t\t\tname\n\t\t\tcategory\n\t\t}\n\t}\n": types.AddTagDocument,
    "\n\tquery getList($id: String!) {\n\t\tgetList(id: $id) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n": types.GetListDocument,
    "\n\tmutation editList($id: String!, $comment: String!) {\n\t\teditList(id: $id, comment: $comment) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n": types.EditListDocument,
    "\n\tmutation addList($drop: String!, $category: GearCategory!, $comment: String) {\n\t\taddList(drop: $drop, category: $category, comment: $comment) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n": types.AddListDocument,
    "\n\tfragment GearListItemDetails on GearListItem {\n\t\tid\n\t\tquantity\n\t\tcomment\n\t\tupdatedAt\n\t\tgearItem {\n\t\t\t...GearItemDetails\n\t\t}\n\t\tuserThatUpdated {\n\t\t\t...UserDetails\n\t\t}\n\t\tprefs {\n\t\t\tpref {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t\topts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n": types.GearListItemDetailsFragmentDoc,
    "\n\tquery getListItems(\n\t\t$list: String!\n\t\t$limit: Int\n\t\t$offset: Int\n\t\t$tags: [String]\n\t) {\n\t\tgetListItems(list: $list, limit: $limit, offset: $offset, tags: $tags) {\n\t\t\ttotalDocs\n\t\t\tgearListItems {\n\t\t\t\t...GearListItemDetails\n\t\t\t}\n\t\t}\n\t}\n\t\n": types.GetListItemsDocument,
    "\n\tmutation addListItem(\n\t\t$list: String!\n\t\t$gearItem: String!\n\t\t$quantity: Int\n\t\t$prefs: [ListPrefInput]\n\t\t$comment: String\n\t) {\n\t\taddListItem(\n\t\t\tlist: $list\n\t\t\tgearItem: $gearItem\n\t\t\tquantity: $quantity\n\t\t\tprefs: $prefs\n\t\t\tcomment: $comment\n\t\t) {\n\t\t\t...GearListItemDetails\n\t\t}\n\t}\n\t\n": types.AddListItemDocument,
    "\n\tmutation editListItem(\n\t\t$list: String!\n\t\t$id: String!\n\t\t$quantity: Int\n\t\t$prefs: [ListPrefInput]\n\t\t$comment: String\n\t) {\n\t\teditListItem(\n\t\t\tlist: $list\n\t\t\tid: $id\n\t\t\tquantity: $quantity\n\t\t\tprefs: $prefs\n\t\t\tcomment: $comment\n\t\t) {\n\t\t\t...GearListItemDetails\n\t\t}\n\t}\n\t\n": types.EditListItemDocument,
    "\n\tmutation removeListItem($list: String!, $id: String!) {\n\t\tremoveListItem(list: $list, id: $id)\n\t}\n": types.RemoveListItemDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment UserDetails on User {\n\t\tid\n\t\tusername\n\t\tfullName\n\t\tprofilePicture\n\t}\n"): (typeof documents)["\n\tfragment UserDetails on User {\n\t\tid\n\t\tusername\n\t\tfullName\n\t\tprofilePicture\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment GearItemDetails on GearItem {\n\t\tid\n\t\tcategory\n\t\tmanufacturer\n\t\tmodel\n\t\tdescription\n\t\tproductURL\n\t\timages {\n\t\t\tid\n\t\t\turl\n\t\t\twidth\n\t\t\theight\n\t\t}\n\t\tallPrefs {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment GearItemDetails on GearItem {\n\t\tid\n\t\tcategory\n\t\tmanufacturer\n\t\tmodel\n\t\tdescription\n\t\tproductURL\n\t\timages {\n\t\t\tid\n\t\t\turl\n\t\t\twidth\n\t\t\theight\n\t\t}\n\t\tallPrefs {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t\ttags {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment ListDetails on GearList {\n\t\tid\n\t\tcategory\n\t\tcomment\n\t\tdrop {\n\t\t\tid\n\t\t\tproject\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdatedAt\n\t}\n"): (typeof documents)["\n\tfragment ListDetails on GearList {\n\t\tid\n\t\tcategory\n\t\tcomment\n\t\tdrop {\n\t\t\tid\n\t\t\tproject\n\t\t\tusers {\n\t\t\t\tid\n\t\t\t}\n\t\t}\n\t\tupdatedAt\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation login($username: String!, $password: String!) {\n\t\tlogin(username: $username, password: $password) {\n\t\t\tvalue\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation login($username: String!, $password: String!) {\n\t\tlogin(username: $username, password: $password) {\n\t\t\tvalue\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation passwordReset($username: String!) {\n\t\tpasswordReset(username: $username)\n\t}\n"): (typeof documents)["\n\tmutation passwordReset($username: String!) {\n\t\tpasswordReset(username: $username)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation createUser(\n\t\t$fullName: String!\n\t\t$username: String!\n\t\t$password: String!\n\t\t$captchaToken: String!\n\t) {\n\t\tcreateUser(\n\t\t\tfullName: $fullName\n\t\t\tusername: $username\n\t\t\tpassword: $password\n\t\t\tcaptchaToken: $captchaToken\n\t\t) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation createUser(\n\t\t$fullName: String!\n\t\t$username: String!\n\t\t$password: String!\n\t\t$captchaToken: String!\n\t) {\n\t\tcreateUser(\n\t\t\tfullName: $fullName\n\t\t\tusername: $username\n\t\t\tpassword: $password\n\t\t\tcaptchaToken: $captchaToken\n\t\t) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation editMe(\n\t\t$username: String\n\t\t$password: String\n\t\t$profilePicture: String\n\t\t$fullName: String\n\t) {\n\t\teditMe(\n\t\t\tusername: $username\n\t\t\tpassword: $password\n\t\t\tprofilePicture: $profilePicture\n\t\t\tfullName: $fullName\n\t\t) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation editMe(\n\t\t$username: String\n\t\t$password: String\n\t\t$profilePicture: String\n\t\t$fullName: String\n\t) {\n\t\teditMe(\n\t\t\tusername: $username\n\t\t\tpassword: $password\n\t\t\tprofilePicture: $profilePicture\n\t\t\tfullName: $fullName\n\t\t) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment DropDetails on Drop {\n\t\tid\n\t\tproject\n\t\tclient\n\t\tdirector\n\t\tdop\n\t\tsoundie\n\t\tgearCheckDate\n\t\tstartDate\n\t\tendDate\n\t\twrapDate\n\t\tupdatedAt\n\t\tusers {\n\t\t\t...UserDetails\n\t\t}\n\t\tlists {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n\t\n"): (typeof documents)["\n\tfragment DropDetails on Drop {\n\t\tid\n\t\tproject\n\t\tclient\n\t\tdirector\n\t\tdop\n\t\tsoundie\n\t\tgearCheckDate\n\t\tstartDate\n\t\tendDate\n\t\twrapDate\n\t\tupdatedAt\n\t\tusers {\n\t\t\t...UserDetails\n\t\t}\n\t\tlists {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery allDrops($drop: String!) {\n\t\tallDrops(drop: $drop) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery allDrops($drop: String!) {\n\t\tallDrops(drop: $drop) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery allUsers($fullName: String) {\n\t\tallUsers(fullName: $fullName) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery allUsers($fullName: String) {\n\t\tallUsers(fullName: $fullName) {\n\t\t\t...UserDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addDrop($project: String!, $client: String) {\n\t\taddDrop(project: $project, client: $client) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\n\t\n"): (typeof documents)["\n\tmutation addDrop($project: String!, $client: String) {\n\t\taddDrop(project: $project, client: $client) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation updateDrop(\n\t\t$id: String!\n\t\t$project: String\n\t\t$client: String\n\t\t$director: String\n\t\t$dop: String\n\t\t$soundie: String\n\t\t$gearCheckDate: Date\n\t\t$startDate: Date\n\t\t$endDate: Date\n\t\t$wrapDate: Date\n\t\t$users: [String]\n\t) {\n\t\tupdateDrop(\n\t\t\tid: $id\n\t\t\tproject: $project\n\t\t\tclient: $client\n\t\t\tdirector: $director\n\t\t\tdop: $dop\n\t\t\tsoundie: $soundie\n\t\t\tgearCheckDate: $gearCheckDate\n\t\t\tstartDate: $startDate\n\t\t\tendDate: $endDate\n\t\t\twrapDate: $wrapDate\n\t\t\tusers: $users\n\t\t) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation updateDrop(\n\t\t$id: String!\n\t\t$project: String\n\t\t$client: String\n\t\t$director: String\n\t\t$dop: String\n\t\t$soundie: String\n\t\t$gearCheckDate: Date\n\t\t$startDate: Date\n\t\t$endDate: Date\n\t\t$wrapDate: Date\n\t\t$users: [String]\n\t) {\n\t\tupdateDrop(\n\t\t\tid: $id\n\t\t\tproject: $project\n\t\t\tclient: $client\n\t\t\tdirector: $director\n\t\t\tdop: $dop\n\t\t\tsoundie: $soundie\n\t\t\tgearCheckDate: $gearCheckDate\n\t\t\tstartDate: $startDate\n\t\t\tendDate: $endDate\n\t\t\twrapDate: $wrapDate\n\t\t\tusers: $users\n\t\t) {\n\t\t\t...DropDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery allGearItems(\n\t\t$id: String\n\t\t$category: GearCategory\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$tags: [String]\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$random: Boolean\n\t) {\n\t\tallGearItems(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\ttags: $tags\n\t\t\toffset: $offset\n\t\t\tlimit: $limit\n\t\t\trandom: $random\n\t\t) {\n\t\t\ttotalDocs\n\t\t\tgearItems {\n\t\t\t\t...GearItemDetails\n\t\t\t}\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery allGearItems(\n\t\t$id: String\n\t\t$category: GearCategory\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$tags: [String]\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$random: Boolean\n\t) {\n\t\tallGearItems(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\ttags: $tags\n\t\t\toffset: $offset\n\t\t\tlimit: $limit\n\t\t\trandom: $random\n\t\t) {\n\t\t\ttotalDocs\n\t\t\tgearItems {\n\t\t\t\t...GearItemDetails\n\t\t\t}\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery randomGearItems(\n\t\t$id: String\n\t\t$category: GearCategory\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$tags: [String]\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$random: Boolean\n\t) {\n\t\tallGearItems(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\ttags: $tags\n\t\t\toffset: $offset\n\t\t\tlimit: $limit\n\t\t\trandom: $random\n\t\t) {\n\t\t\tgearItems {\n\t\t\t\tid\n\t\t\t\tcategory\n\t\t\t\tmanufacturer\n\t\t\t\tmodel\n\t\t\t\tdescription\n\t\t\t\tproductURL\n\t\t\t\timages {\n\t\t\t\t\tid\n\t\t\t\t\turl\n\t\t\t\t\twidth\n\t\t\t\t\theight\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery randomGearItems(\n\t\t$id: String\n\t\t$category: GearCategory\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$tags: [String]\n\t\t$offset: Int\n\t\t$limit: Int\n\t\t$random: Boolean\n\t) {\n\t\tallGearItems(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\ttags: $tags\n\t\t\toffset: $offset\n\t\t\tlimit: $limit\n\t\t\trandom: $random\n\t\t) {\n\t\t\tgearItems {\n\t\t\t\tid\n\t\t\t\tcategory\n\t\t\t\tmanufacturer\n\t\t\t\tmodel\n\t\t\t\tdescription\n\t\t\t\tproductURL\n\t\t\t\timages {\n\t\t\t\t\tid\n\t\t\t\t\turl\n\t\t\t\t\twidth\n\t\t\t\t\theight\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addGearItem(\n\t\t$category: [GearCategory!]\n\t\t$manufacturer: String!\n\t\t$model: String!\n\t) {\n\t\taddGearItem(\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t) {\n\t\t\t...GearItemDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation addGearItem(\n\t\t$category: [GearCategory!]\n\t\t$manufacturer: String!\n\t\t$model: String!\n\t) {\n\t\taddGearItem(\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t) {\n\t\t\t...GearItemDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation editGearItem(\n\t\t$id: String!\n\t\t$category: [GearCategory]\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$description: String\n\t\t$productURL: String\n\t\t$tags: [String]\n\t\t$prefs: [GearPrefInput]\n\t) {\n\t\teditGearItem(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\tdescription: $description\n\t\t\tproductURL: $productURL\n\t\t\ttags: $tags\n\t\t\tprefs: $prefs\n\t\t) {\n\t\t\t...GearItemDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation editGearItem(\n\t\t$id: String!\n\t\t$category: [GearCategory]\n\t\t$manufacturer: String\n\t\t$model: String\n\t\t$description: String\n\t\t$productURL: String\n\t\t$tags: [String]\n\t\t$prefs: [GearPrefInput]\n\t) {\n\t\teditGearItem(\n\t\t\tid: $id\n\t\t\tcategory: $category\n\t\t\tmanufacturer: $manufacturer\n\t\t\tmodel: $model\n\t\t\tdescription: $description\n\t\t\tproductURL: $productURL\n\t\t\ttags: $tags\n\t\t\tprefs: $prefs\n\t\t) {\n\t\t\t...GearItemDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addGearPref($gearItem: String!) {\n\t\taddGearPref(gearItem: $gearItem) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation addGearPref($gearItem: String!) {\n\t\taddGearPref(gearItem: $gearItem) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation editGearPref($id: String!, $name: String!) {\n\t\teditGearPref(id: $id, name: $name) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation editGearPref($id: String!, $name: String!) {\n\t\teditGearPref(id: $id, name: $name) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation removeGearPref($id: String!, $gearItem: String!) {\n\t\tremoveGearPref(id: $id, gearItem: $gearItem)\n\t}\n"): (typeof documents)["\n\tmutation removeGearPref($id: String!, $gearItem: String!) {\n\t\tremoveGearPref(id: $id, gearItem: $gearItem)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addGearPrefOpt($gearPref: String!) {\n\t\taddGearPrefOpt(gearPref: $gearPref) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation addGearPrefOpt($gearPref: String!) {\n\t\taddGearPrefOpt(gearPref: $gearPref) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation removeGearPrefOpt($gearPref: String!, $id: String!) {\n\t\tremoveGearPrefOpt(gearPref: $gearPref, id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation removeGearPrefOpt($gearPref: String!, $id: String!) {\n\t\tremoveGearPrefOpt(gearPref: $gearPref, id: $id) {\n\t\t\tid\n\t\t\tname\n\t\t\tallOpts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation editGearPrefOpt($id: String!, $name: String!) {\n\t\teditGearPrefOpt(id: $id, name: $name) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation editGearPrefOpt($id: String!, $name: String!) {\n\t\teditGearPrefOpt(id: $id, name: $name) {\n\t\t\tid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addGearImage(\n\t\t$gearItem: String!\n\t\t$url: String!\n\t\t$width: Int\n\t\t$height: Int\n\t) {\n\t\taddGearImage(\n\t\t\tgearItem: $gearItem\n\t\t\turl: $url\n\t\t\twidth: $width\n\t\t\theight: $height\n\t\t) {\n\t\t\tid\n\t\t\turl\n\t\t\twidth\n\t\t\theight\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation addGearImage(\n\t\t$gearItem: String!\n\t\t$url: String!\n\t\t$width: Int\n\t\t$height: Int\n\t) {\n\t\taddGearImage(\n\t\t\tgearItem: $gearItem\n\t\t\turl: $url\n\t\t\twidth: $width\n\t\t\theight: $height\n\t\t) {\n\t\t\tid\n\t\t\turl\n\t\t\twidth\n\t\t\theight\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation removeGearImage($id: String!, $gearItem: String!) {\n\t\tremoveGearImage(id: $id, gearItem: $gearItem)\n\t}\n"): (typeof documents)["\n\tmutation removeGearImage($id: String!, $gearItem: String!) {\n\t\tremoveGearImage(id: $id, gearItem: $gearItem)\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery allTags($tags: [String], $tag: String, $category: [GearCategory]) {\n\t\tallTags(tags: $tags, tag: $tag, category: $category) {\n\t\t\tid\n\t\t\tname\n\t\t\tcategory\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery allTags($tags: [String], $tag: String, $category: [GearCategory]) {\n\t\tallTags(tags: $tags, tag: $tag, category: $category) {\n\t\t\tid\n\t\t\tname\n\t\t\tcategory\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addTag($name: String!, $category: [GearCategory]) {\n\t\taddTag(name: $name, category: $category) {\n\t\t\tid\n\t\t\tname\n\t\t\tcategory\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation addTag($name: String!, $category: [GearCategory]) {\n\t\taddTag(name: $name, category: $category) {\n\t\t\tid\n\t\t\tname\n\t\t\tcategory\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getList($id: String!) {\n\t\tgetList(id: $id) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery getList($id: String!) {\n\t\tgetList(id: $id) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation editList($id: String!, $comment: String!) {\n\t\teditList(id: $id, comment: $comment) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation editList($id: String!, $comment: String!) {\n\t\teditList(id: $id, comment: $comment) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addList($drop: String!, $category: GearCategory!, $comment: String) {\n\t\taddList(drop: $drop, category: $category, comment: $comment) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation addList($drop: String!, $category: GearCategory!, $comment: String) {\n\t\taddList(drop: $drop, category: $category, comment: $comment) {\n\t\t\t...ListDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tfragment GearListItemDetails on GearListItem {\n\t\tid\n\t\tquantity\n\t\tcomment\n\t\tupdatedAt\n\t\tgearItem {\n\t\t\t...GearItemDetails\n\t\t}\n\t\tuserThatUpdated {\n\t\t\t...UserDetails\n\t\t}\n\t\tprefs {\n\t\t\tpref {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t\topts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n"): (typeof documents)["\n\tfragment GearListItemDetails on GearListItem {\n\t\tid\n\t\tquantity\n\t\tcomment\n\t\tupdatedAt\n\t\tgearItem {\n\t\t\t...GearItemDetails\n\t\t}\n\t\tuserThatUpdated {\n\t\t\t...UserDetails\n\t\t}\n\t\tprefs {\n\t\t\tpref {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t\topts {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t}\n\t\t}\n\t}\n\t\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery getListItems(\n\t\t$list: String!\n\t\t$limit: Int\n\t\t$offset: Int\n\t\t$tags: [String]\n\t) {\n\t\tgetListItems(list: $list, limit: $limit, offset: $offset, tags: $tags) {\n\t\t\ttotalDocs\n\t\t\tgearListItems {\n\t\t\t\t...GearListItemDetails\n\t\t\t}\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tquery getListItems(\n\t\t$list: String!\n\t\t$limit: Int\n\t\t$offset: Int\n\t\t$tags: [String]\n\t) {\n\t\tgetListItems(list: $list, limit: $limit, offset: $offset, tags: $tags) {\n\t\t\ttotalDocs\n\t\t\tgearListItems {\n\t\t\t\t...GearListItemDetails\n\t\t\t}\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation addListItem(\n\t\t$list: String!\n\t\t$gearItem: String!\n\t\t$quantity: Int\n\t\t$prefs: [ListPrefInput]\n\t\t$comment: String\n\t) {\n\t\taddListItem(\n\t\t\tlist: $list\n\t\t\tgearItem: $gearItem\n\t\t\tquantity: $quantity\n\t\t\tprefs: $prefs\n\t\t\tcomment: $comment\n\t\t) {\n\t\t\t...GearListItemDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation addListItem(\n\t\t$list: String!\n\t\t$gearItem: String!\n\t\t$quantity: Int\n\t\t$prefs: [ListPrefInput]\n\t\t$comment: String\n\t) {\n\t\taddListItem(\n\t\t\tlist: $list\n\t\t\tgearItem: $gearItem\n\t\t\tquantity: $quantity\n\t\t\tprefs: $prefs\n\t\t\tcomment: $comment\n\t\t) {\n\t\t\t...GearListItemDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation editListItem(\n\t\t$list: String!\n\t\t$id: String!\n\t\t$quantity: Int\n\t\t$prefs: [ListPrefInput]\n\t\t$comment: String\n\t) {\n\t\teditListItem(\n\t\t\tlist: $list\n\t\t\tid: $id\n\t\t\tquantity: $quantity\n\t\t\tprefs: $prefs\n\t\t\tcomment: $comment\n\t\t) {\n\t\t\t...GearListItemDetails\n\t\t}\n\t}\n\t\n"): (typeof documents)["\n\tmutation editListItem(\n\t\t$list: String!\n\t\t$id: String!\n\t\t$quantity: Int\n\t\t$prefs: [ListPrefInput]\n\t\t$comment: String\n\t) {\n\t\teditListItem(\n\t\t\tlist: $list\n\t\t\tid: $id\n\t\t\tquantity: $quantity\n\t\t\tprefs: $prefs\n\t\t\tcomment: $comment\n\t\t) {\n\t\t\t...GearListItemDetails\n\t\t}\n\t}\n\t\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation removeListItem($list: String!, $id: String!) {\n\t\tremoveListItem(list: $list, id: $id)\n\t}\n"): (typeof documents)["\n\tmutation removeListItem($list: String!, $id: String!) {\n\t\tremoveListItem(list: $list, id: $id)\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;