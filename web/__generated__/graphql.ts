/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Drop = {
  __typename?: 'Drop';
  client?: Maybe<Scalars['String']>;
  director?: Maybe<Scalars['String']>;
  dop?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['Date']>;
  gearCheckDate?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  lists?: Maybe<Array<Maybe<GearList>>>;
  project: Scalars['String'];
  soundie?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  updatedAt?: Maybe<Scalars['Date']>;
  users?: Maybe<Array<User>>;
  wrapDate?: Maybe<Scalars['Date']>;
};

export enum GearCategory {
  Camera = 'CAMERA',
  Grips = 'GRIPS',
  Lighting = 'LIGHTING',
  Sound = 'SOUND'
}

export type GearImage = {
  __typename?: 'GearImage';
  height?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  url?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Int']>;
};

export type GearItem = {
  __typename?: 'GearItem';
  allPrefs?: Maybe<Array<Maybe<GearPref>>>;
  category?: Maybe<Array<Maybe<GearCategory>>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images?: Maybe<Array<Maybe<GearImage>>>;
  manufacturer: Scalars['String'];
  model: Scalars['String'];
  productURL?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Tag>>>;
};

export type GearItemResults = {
  __typename?: 'GearItemResults';
  gearItems?: Maybe<Array<Maybe<GearItem>>>;
  nextPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  totalDocs?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type GearList = {
  __typename?: 'GearList';
  category?: Maybe<Scalars['String']>;
  comment?: Maybe<Scalars['String']>;
  drop?: Maybe<Drop>;
  id: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Date']>;
};

export type GearListGearPref = {
  __typename?: 'GearListGearPref';
  opts?: Maybe<Array<Maybe<GearPrefOpt>>>;
  pref?: Maybe<GearPref>;
};

export type GearListItem = {
  __typename?: 'GearListItem';
  comment?: Maybe<Scalars['String']>;
  gearItem: GearItem;
  gearList: GearList;
  id: Scalars['ID'];
  prefs?: Maybe<Array<Maybe<GearListGearPref>>>;
  quantity?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Date']>;
  userThatUpdated?: Maybe<User>;
};

export type GearPref = {
  __typename?: 'GearPref';
  allOpts?: Maybe<Array<Maybe<GearPrefOpt>>>;
  gearItem: GearItem;
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type GearPrefInput = {
  allOpts?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type GearPrefOpt = {
  __typename?: 'GearPrefOpt';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ListItemResults = {
  __typename?: 'ListItemResults';
  gearListItems?: Maybe<Array<Maybe<GearListItem>>>;
  nextPage?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
  prevPage?: Maybe<Scalars['Int']>;
  totalDocs?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type ListPrefInput = {
  id?: InputMaybe<Scalars['String']>;
  opts?: InputMaybe<Array<Scalars['String']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addDrop: Drop;
  addGearImage: GearImage;
  addGearItem: GearItem;
  addGearPref: GearPref;
  addGearPrefOpt: GearPref;
  addList: GearList;
  addListItem: GearListItem;
  addTag: Tag;
  createUser: User;
  editGearItem: GearItem;
  editGearPref: GearPref;
  editGearPrefOpt: GearPrefOpt;
  editList: GearList;
  editListItem: GearListItem;
  editMe: User;
  login: Token;
  passwordReset: Scalars['Boolean'];
  removeDrop: Scalars['Boolean'];
  removeGearImage: Scalars['String'];
  removeGearPref: Scalars['String'];
  removeGearPrefOpt: GearPref;
  removeList: Scalars['Boolean'];
  removeListItem: Scalars['String'];
  updateDrop: Drop;
};


export type MutationAddDropArgs = {
  client?: InputMaybe<Scalars['String']>;
  director?: InputMaybe<Scalars['String']>;
  dop?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  gearCheckDate?: InputMaybe<Scalars['Date']>;
  project: Scalars['String'];
  soundie?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  wrapDate?: InputMaybe<Scalars['Date']>;
};


export type MutationAddGearImageArgs = {
  gearItem: Scalars['String'];
  height?: InputMaybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};


export type MutationAddGearItemArgs = {
  category?: InputMaybe<Array<InputMaybe<GearCategory>>>;
  description?: InputMaybe<Scalars['String']>;
  manufacturer: Scalars['String'];
  model: Scalars['String'];
  prefs?: InputMaybe<Array<InputMaybe<GearPrefInput>>>;
  productURL?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationAddGearPrefArgs = {
  gearItem: Scalars['String'];
};


export type MutationAddGearPrefOptArgs = {
  gearPref?: InputMaybe<Scalars['String']>;
};


export type MutationAddListArgs = {
  category: GearCategory;
  comment?: InputMaybe<Scalars['String']>;
  drop: Scalars['String'];
};


export type MutationAddListItemArgs = {
  comment?: InputMaybe<Scalars['String']>;
  gearItem: Scalars['String'];
  list: Scalars['String'];
  prefs?: InputMaybe<Array<InputMaybe<ListPrefInput>>>;
  quantity?: InputMaybe<Scalars['Int']>;
};


export type MutationAddTagArgs = {
  category?: InputMaybe<Array<InputMaybe<GearCategory>>>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  captchaToken: Scalars['String'];
  fullName?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  profilePicture?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
};


export type MutationEditGearItemArgs = {
  category?: InputMaybe<Array<InputMaybe<GearCategory>>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  manufacturer?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  prefs?: InputMaybe<Array<InputMaybe<GearPrefInput>>>;
  productURL?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationEditGearPrefArgs = {
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationEditGearPrefOptArgs = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};


export type MutationEditListArgs = {
  comment: Scalars['String'];
  id: Scalars['String'];
};


export type MutationEditListItemArgs = {
  comment?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  list: Scalars['String'];
  prefs?: InputMaybe<Array<InputMaybe<ListPrefInput>>>;
  quantity?: InputMaybe<Scalars['Int']>;
};


export type MutationEditMeArgs = {
  fullName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationPasswordResetArgs = {
  username: Scalars['String'];
};


export type MutationRemoveDropArgs = {
  drop: Scalars['String'];
};


export type MutationRemoveGearImageArgs = {
  gearItem: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveGearPrefArgs = {
  gearItem: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRemoveGearPrefOptArgs = {
  gearPref: Scalars['String'];
  id: Scalars['String'];
};


export type MutationRemoveListArgs = {
  id: Scalars['String'];
};


export type MutationRemoveListItemArgs = {
  id: Scalars['String'];
  list: Scalars['String'];
};


export type MutationUpdateDropArgs = {
  client?: InputMaybe<Scalars['String']>;
  director?: InputMaybe<Scalars['String']>;
  dop?: InputMaybe<Scalars['String']>;
  endDate?: InputMaybe<Scalars['Date']>;
  gearCheckDate?: InputMaybe<Scalars['Date']>;
  id: Scalars['String'];
  project?: InputMaybe<Scalars['String']>;
  soundie?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  wrapDate?: InputMaybe<Scalars['Date']>;
};

export type Query = {
  __typename?: 'Query';
  allDrops?: Maybe<Array<Drop>>;
  allGearItems?: Maybe<GearItemResults>;
  allTags?: Maybe<Array<Tag>>;
  allUsers?: Maybe<Array<Maybe<User>>>;
  getGearImageUpload: Scalars['String'];
  getList: GearList;
  getListItems: ListItemResults;
  getProfileImageUpload: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryAllDropsArgs = {
  drop?: InputMaybe<Scalars['String']>;
};


export type QueryAllGearItemsArgs = {
  category?: InputMaybe<GearCategory>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  manufacturer?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  offset?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryAllTagsArgs = {
  category?: InputMaybe<Array<InputMaybe<GearCategory>>>;
  tag?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryAllUsersArgs = {
  fullName?: InputMaybe<Scalars['String']>;
};


export type QueryGetGearImageUploadArgs = {
  gearItem: Scalars['String'];
};


export type QueryGetListArgs = {
  id: Scalars['String'];
};


export type QueryGetListItemsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  list: Scalars['String'];
  offset?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Tag = {
  __typename?: 'Tag';
  category?: Maybe<Array<Maybe<Scalars['String']>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  drops?: Maybe<Array<Maybe<Drop>>>;
  fullName?: Maybe<Scalars['String']>;
  gearhouse: Scalars['Boolean'];
  id: Scalars['ID'];
  profilePicture?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type UserDetailsFragment = { __typename?: 'User', id: string, username: string, fullName?: string | null, profilePicture?: string | null } & { ' $fragmentName'?: 'UserDetailsFragment' };

export type GearItemDetailsFragment = { __typename?: 'GearItem', id: string, category?: Array<GearCategory | null> | null, manufacturer: string, model: string, description?: string | null, productURL?: string | null, images?: Array<{ __typename?: 'GearImage', id?: string | null, url?: string | null, width?: number | null, height?: number | null } | null> | null, allPrefs?: Array<{ __typename?: 'GearPref', id?: string | null, name: string, allOpts?: Array<{ __typename?: 'GearPrefOpt', id: string, name: string } | null> | null } | null> | null, tags?: Array<{ __typename?: 'Tag', id: string, name: string } | null> | null } & { ' $fragmentName'?: 'GearItemDetailsFragment' };

export type ListDetailsFragment = { __typename?: 'GearList', id: string, category?: string | null, comment?: string | null, updatedAt?: any | null, drop?: { __typename?: 'Drop', id: string, project: string, users?: Array<{ __typename?: 'User', id: string }> | null } | null } & { ' $fragmentName'?: 'ListDetailsFragment' };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', value: string } };

export type PasswordResetMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type PasswordResetMutation = { __typename?: 'Mutation', passwordReset: boolean };

export type CreateUserMutationVariables = Exact<{
  fullName: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  captchaToken: Scalars['String'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailsFragment': UserDetailsFragment } }
  ) };

export type EditMeMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['String']>;
  fullName?: InputMaybe<Scalars['String']>;
}>;


export type EditMeMutation = { __typename?: 'Mutation', editMe: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailsFragment': UserDetailsFragment } }
  ) };

export type DropDetailsFragment = { __typename?: 'Drop', id: string, project: string, client?: string | null, director?: string | null, dop?: string | null, soundie?: string | null, gearCheckDate?: any | null, startDate?: any | null, endDate?: any | null, wrapDate?: any | null, updatedAt?: any | null, users?: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailsFragment': UserDetailsFragment } }
  )> | null, lists?: Array<(
    { __typename?: 'GearList' }
    & { ' $fragmentRefs'?: { 'ListDetailsFragment': ListDetailsFragment } }
  ) | null> | null } & { ' $fragmentName'?: 'DropDetailsFragment' };

export type AllDropsQueryVariables = Exact<{
  drop: Scalars['String'];
}>;


export type AllDropsQuery = { __typename?: 'Query', allDrops?: Array<(
    { __typename?: 'Drop' }
    & { ' $fragmentRefs'?: { 'DropDetailsFragment': DropDetailsFragment } }
  )> | null };

export type AllUsersQueryVariables = Exact<{
  fullName?: InputMaybe<Scalars['String']>;
}>;


export type AllUsersQuery = { __typename?: 'Query', allUsers?: Array<(
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailsFragment': UserDetailsFragment } }
  ) | null> | null };

export type AddDropMutationVariables = Exact<{
  project: Scalars['String'];
  client?: InputMaybe<Scalars['String']>;
}>;


export type AddDropMutation = { __typename?: 'Mutation', addDrop: (
    { __typename?: 'Drop' }
    & { ' $fragmentRefs'?: { 'DropDetailsFragment': DropDetailsFragment } }
  ) };

export type UpdateDropMutationVariables = Exact<{
  id: Scalars['String'];
  project?: InputMaybe<Scalars['String']>;
  client?: InputMaybe<Scalars['String']>;
  director?: InputMaybe<Scalars['String']>;
  dop?: InputMaybe<Scalars['String']>;
  soundie?: InputMaybe<Scalars['String']>;
  gearCheckDate?: InputMaybe<Scalars['Date']>;
  startDate?: InputMaybe<Scalars['Date']>;
  endDate?: InputMaybe<Scalars['Date']>;
  wrapDate?: InputMaybe<Scalars['Date']>;
  users?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type UpdateDropMutation = { __typename?: 'Mutation', updateDrop: (
    { __typename?: 'Drop' }
    & { ' $fragmentRefs'?: { 'DropDetailsFragment': DropDetailsFragment } }
  ) };

export type AllGearItemsQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<GearCategory>;
  manufacturer?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  offset?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
}>;


export type AllGearItemsQuery = { __typename?: 'Query', allGearItems?: { __typename?: 'GearItemResults', totalDocs?: number | null, gearItems?: Array<(
      { __typename?: 'GearItem' }
      & { ' $fragmentRefs'?: { 'GearItemDetailsFragment': GearItemDetailsFragment } }
    ) | null> | null } | null };

export type AddGearItemMutationVariables = Exact<{
  category?: InputMaybe<Array<GearCategory> | GearCategory>;
  manufacturer: Scalars['String'];
  model: Scalars['String'];
}>;


export type AddGearItemMutation = { __typename?: 'Mutation', addGearItem: (
    { __typename?: 'GearItem' }
    & { ' $fragmentRefs'?: { 'GearItemDetailsFragment': GearItemDetailsFragment } }
  ) };

export type EditGearItemMutationVariables = Exact<{
  id: Scalars['String'];
  category?: InputMaybe<Array<InputMaybe<GearCategory>> | InputMaybe<GearCategory>>;
  manufacturer?: InputMaybe<Scalars['String']>;
  model?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  productURL?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  prefs?: InputMaybe<Array<InputMaybe<GearPrefInput>> | InputMaybe<GearPrefInput>>;
}>;


export type EditGearItemMutation = { __typename?: 'Mutation', editGearItem: (
    { __typename?: 'GearItem' }
    & { ' $fragmentRefs'?: { 'GearItemDetailsFragment': GearItemDetailsFragment } }
  ) };

export type AddGearPrefMutationVariables = Exact<{
  gearItem: Scalars['String'];
}>;


export type AddGearPrefMutation = { __typename?: 'Mutation', addGearPref: { __typename?: 'GearPref', id?: string | null, name: string, allOpts?: Array<{ __typename?: 'GearPrefOpt', id: string, name: string } | null> | null } };

export type EditGearPrefMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type EditGearPrefMutation = { __typename?: 'Mutation', editGearPref: { __typename?: 'GearPref', id?: string | null, name: string } };

export type RemoveGearPrefMutationVariables = Exact<{
  id: Scalars['String'];
  gearItem: Scalars['String'];
}>;


export type RemoveGearPrefMutation = { __typename?: 'Mutation', removeGearPref: string };

export type AddGearPrefOptMutationVariables = Exact<{
  gearPref: Scalars['String'];
}>;


export type AddGearPrefOptMutation = { __typename?: 'Mutation', addGearPrefOpt: { __typename?: 'GearPref', id?: string | null, name: string, allOpts?: Array<{ __typename?: 'GearPrefOpt', id: string, name: string } | null> | null } };

export type RemoveGearPrefOptMutationVariables = Exact<{
  gearPref: Scalars['String'];
  id: Scalars['String'];
}>;


export type RemoveGearPrefOptMutation = { __typename?: 'Mutation', removeGearPrefOpt: { __typename?: 'GearPref', id?: string | null, name: string, allOpts?: Array<{ __typename?: 'GearPrefOpt', id: string, name: string } | null> | null } };

export type EditGearPrefOptMutationVariables = Exact<{
  id: Scalars['String'];
  name: Scalars['String'];
}>;


export type EditGearPrefOptMutation = { __typename?: 'Mutation', editGearPrefOpt: { __typename?: 'GearPrefOpt', id: string, name: string } };

export type AddGearImageMutationVariables = Exact<{
  gearItem: Scalars['String'];
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
}>;


export type AddGearImageMutation = { __typename?: 'Mutation', addGearImage: { __typename?: 'GearImage', id?: string | null, url?: string | null, width?: number | null, height?: number | null } };

export type RemoveGearImageMutationVariables = Exact<{
  id: Scalars['String'];
  gearItem: Scalars['String'];
}>;


export type RemoveGearImageMutation = { __typename?: 'Mutation', removeGearImage: string };

export type AllTagsQueryVariables = Exact<{
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  tag?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<Array<InputMaybe<GearCategory>> | InputMaybe<GearCategory>>;
}>;


export type AllTagsQuery = { __typename?: 'Query', allTags?: Array<{ __typename?: 'Tag', id: string, name: string, category?: Array<string | null> | null }> | null };

export type AddTagMutationVariables = Exact<{
  name: Scalars['String'];
  category?: InputMaybe<Array<InputMaybe<GearCategory>> | InputMaybe<GearCategory>>;
}>;


export type AddTagMutation = { __typename?: 'Mutation', addTag: { __typename?: 'Tag', id: string, name: string, category?: Array<string | null> | null } };

export type GetListQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetListQuery = { __typename?: 'Query', getList: (
    { __typename?: 'GearList' }
    & { ' $fragmentRefs'?: { 'ListDetailsFragment': ListDetailsFragment } }
  ) };

export type EditListMutationVariables = Exact<{
  id: Scalars['String'];
  comment: Scalars['String'];
}>;


export type EditListMutation = { __typename?: 'Mutation', editList: (
    { __typename?: 'GearList' }
    & { ' $fragmentRefs'?: { 'ListDetailsFragment': ListDetailsFragment } }
  ) };

export type AddListMutationVariables = Exact<{
  drop: Scalars['String'];
  category: GearCategory;
  comment?: InputMaybe<Scalars['String']>;
}>;


export type AddListMutation = { __typename?: 'Mutation', addList: (
    { __typename?: 'GearList' }
    & { ' $fragmentRefs'?: { 'ListDetailsFragment': ListDetailsFragment } }
  ) };

export type GearListItemDetailsFragment = { __typename?: 'GearListItem', id: string, quantity?: number | null, comment?: string | null, updatedAt?: any | null, gearItem: (
    { __typename?: 'GearItem' }
    & { ' $fragmentRefs'?: { 'GearItemDetailsFragment': GearItemDetailsFragment } }
  ), userThatUpdated?: (
    { __typename?: 'User' }
    & { ' $fragmentRefs'?: { 'UserDetailsFragment': UserDetailsFragment } }
  ) | null, prefs?: Array<{ __typename?: 'GearListGearPref', pref?: { __typename?: 'GearPref', id?: string | null, name: string } | null, opts?: Array<{ __typename?: 'GearPrefOpt', id: string, name: string } | null> | null } | null> | null } & { ' $fragmentName'?: 'GearListItemDetailsFragment' };

export type GetListItemsQueryVariables = Exact<{
  list: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;


export type GetListItemsQuery = { __typename?: 'Query', getListItems: { __typename?: 'ListItemResults', totalDocs?: number | null, gearListItems?: Array<(
      { __typename?: 'GearListItem' }
      & { ' $fragmentRefs'?: { 'GearListItemDetailsFragment': GearListItemDetailsFragment } }
    ) | null> | null } };

export type AddListItemMutationVariables = Exact<{
  list: Scalars['String'];
  gearItem: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
  prefs?: InputMaybe<Array<InputMaybe<ListPrefInput>> | InputMaybe<ListPrefInput>>;
  comment?: InputMaybe<Scalars['String']>;
}>;


export type AddListItemMutation = { __typename?: 'Mutation', addListItem: (
    { __typename?: 'GearListItem' }
    & { ' $fragmentRefs'?: { 'GearListItemDetailsFragment': GearListItemDetailsFragment } }
  ) };

export type EditListItemMutationVariables = Exact<{
  list: Scalars['String'];
  id: Scalars['String'];
  quantity?: InputMaybe<Scalars['Int']>;
  prefs?: InputMaybe<Array<InputMaybe<ListPrefInput>> | InputMaybe<ListPrefInput>>;
  comment?: InputMaybe<Scalars['String']>;
}>;


export type EditListItemMutation = { __typename?: 'Mutation', editListItem: (
    { __typename?: 'GearListItem' }
    & { ' $fragmentRefs'?: { 'GearListItemDetailsFragment': GearListItemDetailsFragment } }
  ) };

export type RemoveListItemMutationVariables = Exact<{
  list: Scalars['String'];
  id: Scalars['String'];
}>;


export type RemoveListItemMutation = { __typename?: 'Mutation', removeListItem: string };

export const UserDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]} as unknown as DocumentNode<UserDetailsFragment, unknown>;
export const ListDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ListDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GearList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"drop"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<ListDetailsFragment, unknown>;
export const DropDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DropDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Drop"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"project"}},{"kind":"Field","name":{"kind":"Name","value":"client"}},{"kind":"Field","name":{"kind":"Name","value":"director"}},{"kind":"Field","name":{"kind":"Name","value":"dop"}},{"kind":"Field","name":{"kind":"Name","value":"soundie"}},{"kind":"Field","name":{"kind":"Name","value":"gearCheckDate"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"wrapDate"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListDetails"}}]}}]}},...UserDetailsFragmentDoc.definitions,...ListDetailsFragmentDoc.definitions]} as unknown as DocumentNode<DropDetailsFragment, unknown>;
export const GearItemDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GearItemDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GearItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"manufacturer"}},{"kind":"Field","name":{"kind":"Name","value":"model"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"productURL"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"allPrefs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"allOpts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GearItemDetailsFragment, unknown>;
export const GearListItemDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GearListItemDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GearListItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"comment"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"gearItem"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearItemDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"userThatUpdated"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetails"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prefs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pref"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"opts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},...GearItemDetailsFragmentDoc.definitions,...UserDetailsFragmentDoc.definitions]} as unknown as DocumentNode<GearListItemDetailsFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const PasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"passwordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"passwordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<PasswordResetMutation, PasswordResetMutationVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"captchaToken"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"captchaToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"captchaToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetails"}}]}}]}},...UserDetailsFragmentDoc.definitions]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const EditMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editMe"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editMe"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}},{"kind":"Argument","name":{"kind":"Name","value":"profilePicture"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profilePicture"}}},{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetails"}}]}}]}},...UserDetailsFragmentDoc.definitions]} as unknown as DocumentNode<EditMeMutation, EditMeMutationVariables>;
export const AllDropsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allDrops"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"drop"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allDrops"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"drop"},"value":{"kind":"Variable","name":{"kind":"Name","value":"drop"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DropDetails"}}]}}]}},...DropDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AllDropsQuery, AllDropsQueryVariables>;
export const AllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"fullName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"fullName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserDetails"}}]}}]}},...UserDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AllUsersQuery, AllUsersQueryVariables>;
export const AddDropDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addDrop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"client"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addDrop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"client"},"value":{"kind":"Variable","name":{"kind":"Name","value":"client"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DropDetails"}}]}}]}},...DropDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddDropMutation, AddDropMutationVariables>;
export const UpdateDropDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateDrop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"client"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"director"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dop"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"soundie"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearCheckDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"wrapDate"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Date"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"users"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateDrop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"project"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project"}}},{"kind":"Argument","name":{"kind":"Name","value":"client"},"value":{"kind":"Variable","name":{"kind":"Name","value":"client"}}},{"kind":"Argument","name":{"kind":"Name","value":"director"},"value":{"kind":"Variable","name":{"kind":"Name","value":"director"}}},{"kind":"Argument","name":{"kind":"Name","value":"dop"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dop"}}},{"kind":"Argument","name":{"kind":"Name","value":"soundie"},"value":{"kind":"Variable","name":{"kind":"Name","value":"soundie"}}},{"kind":"Argument","name":{"kind":"Name","value":"gearCheckDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearCheckDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"startDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"startDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"endDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"endDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"wrapDate"},"value":{"kind":"Variable","name":{"kind":"Name","value":"wrapDate"}}},{"kind":"Argument","name":{"kind":"Name","value":"users"},"value":{"kind":"Variable","name":{"kind":"Name","value":"users"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DropDetails"}}]}}]}},...DropDetailsFragmentDoc.definitions]} as unknown as DocumentNode<UpdateDropMutation, UpdateDropMutationVariables>;
export const AllGearItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allGearItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GearCategory"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manufacturer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allGearItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"manufacturer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manufacturer"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"gearItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearItemDetails"}}]}}]}}]}},...GearItemDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AllGearItemsQuery, AllGearItemsQueryVariables>;
export const AddGearItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGearItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GearCategory"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manufacturer"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGearItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"manufacturer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manufacturer"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearItemDetails"}}]}}]}},...GearItemDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddGearItemMutation, AddGearItemMutationVariables>;
export const EditGearItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editGearItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GearCategory"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"manufacturer"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"model"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"productURL"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefs"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GearPrefInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editGearItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"manufacturer"},"value":{"kind":"Variable","name":{"kind":"Name","value":"manufacturer"}}},{"kind":"Argument","name":{"kind":"Name","value":"model"},"value":{"kind":"Variable","name":{"kind":"Name","value":"model"}}},{"kind":"Argument","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"Argument","name":{"kind":"Name","value":"productURL"},"value":{"kind":"Variable","name":{"kind":"Name","value":"productURL"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefs"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearItemDetails"}}]}}]}},...GearItemDetailsFragmentDoc.definitions]} as unknown as DocumentNode<EditGearItemMutation, EditGearItemMutationVariables>;
export const AddGearPrefDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGearPref"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGearPref"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gearItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"allOpts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddGearPrefMutation, AddGearPrefMutationVariables>;
export const EditGearPrefDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editGearPref"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editGearPref"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EditGearPrefMutation, EditGearPrefMutationVariables>;
export const RemoveGearPrefDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeGearPref"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGearPref"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"gearItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}}}]}]}}]} as unknown as DocumentNode<RemoveGearPrefMutation, RemoveGearPrefMutationVariables>;
export const AddGearPrefOptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGearPrefOpt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearPref"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGearPrefOpt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gearPref"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearPref"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"allOpts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddGearPrefOptMutation, AddGearPrefOptMutationVariables>;
export const RemoveGearPrefOptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeGearPrefOpt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearPref"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGearPrefOpt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gearPref"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearPref"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"allOpts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<RemoveGearPrefOptMutation, RemoveGearPrefOptMutationVariables>;
export const EditGearPrefOptDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editGearPrefOpt"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editGearPrefOpt"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<EditGearPrefOptMutation, EditGearPrefOptMutationVariables>;
export const AddGearImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGearImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"height"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGearImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gearItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}}},{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"Argument","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}},{"kind":"Argument","name":{"kind":"Name","value":"height"},"value":{"kind":"Variable","name":{"kind":"Name","value":"height"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}}]}}]} as unknown as DocumentNode<AddGearImageMutation, AddGearImageMutationVariables>;
export const RemoveGearImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeGearImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeGearImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"gearItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}}}]}]}}]} as unknown as DocumentNode<RemoveGearImageMutation, RemoveGearImageMutationVariables>;
export const AllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GearCategory"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<AllTagsQuery, AllTagsQueryVariables>;
export const AddTagDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GearCategory"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}}]}}]}}]} as unknown as DocumentNode<AddTagMutation, AddTagMutationVariables>;
export const GetListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListDetails"}}]}}]}},...ListDetailsFragmentDoc.definitions]} as unknown as DocumentNode<GetListQuery, GetListQueryVariables>;
export const EditListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListDetails"}}]}}]}},...ListDetailsFragmentDoc.definitions]} as unknown as DocumentNode<EditListMutation, EditListMutationVariables>;
export const AddListDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addList"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"drop"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GearCategory"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addList"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"drop"},"value":{"kind":"Variable","name":{"kind":"Name","value":"drop"}}},{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ListDetails"}}]}}]}},...ListDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddListMutation, AddListMutationVariables>;
export const GetListItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getListItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getListItems"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalDocs"}},{"kind":"Field","name":{"kind":"Name","value":"gearListItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearListItemDetails"}}]}}]}}]}},...GearListItemDetailsFragmentDoc.definitions]} as unknown as DocumentNode<GetListItemsQuery, GetListItemsQueryVariables>;
export const AddListItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addListItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefs"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPrefInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addListItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list"}}},{"kind":"Argument","name":{"kind":"Name","value":"gearItem"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gearItem"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefs"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearListItemDetails"}}]}}]}},...GearListItemDetailsFragmentDoc.definitions]} as unknown as DocumentNode<AddListItemMutation, AddListItemMutationVariables>;
export const EditListItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editListItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prefs"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListPrefInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editListItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"quantity"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quantity"}}},{"kind":"Argument","name":{"kind":"Name","value":"prefs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prefs"}}},{"kind":"Argument","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"GearListItemDetails"}}]}}]}},...GearListItemDetailsFragmentDoc.definitions]} as unknown as DocumentNode<EditListItemMutation, EditListItemMutationVariables>;
export const RemoveListItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeListItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"list"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeListItem"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"list"},"value":{"kind":"Variable","name":{"kind":"Name","value":"list"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<RemoveListItemMutation, RemoveListItemMutationVariables>;