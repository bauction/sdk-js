export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const List__1 = IDL.Rec();
  const AuctionDirectionType = IDL.Variant({
    ETender: IDL.Null,
    ForwardAuction: IDL.Null,
    ReverseAuction: IDL.Null,
    FlexibleOffers: IDL.Null,
  });
  const AuctionInput = IDL.Record({
    maxBidAmt: IDL.Nat,
    endDate: IDL.Text,
    auctionType: AuctionDirectionType,
    minBidAmt: IDL.Nat,
    name: IDL.Text,
    description: IDL.Text,
    category: IDL.Text,
    location: IDL.Text,
    startDate: IDL.Text,
  });
  const UserId = IDL.Principal;
  const Bid = IDL.Record({
    id: UserId,
    bid: IDL.Nat,
    submittedAt: IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(Bid, List)));
  const AuctionResponse = IDL.Record({
    id: IDL.Text,
    status: IDL.Bool,
    maxBidAmt: IDL.Nat,
    endDate: IDL.Text,
    auctionType: AuctionDirectionType,
    minBidAmt: IDL.Nat,
    bids: List,
    name: IDL.Text,
    createdBy: IDL.Text,
    description: IDL.Text,
    currency: IDL.Text,
    category: IDL.Text,
    location: IDL.Text,
    startDate: IDL.Text,
  });
  const Bio = IDL.Record({
    about: IDL.Text,
    name: IDL.Text,
    location: IDL.Text,
  });
  const Error = IDL.Variant({
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    AlreadyExists: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  const AuctionType = IDL.Record({
    id: IDL.Text,
    maxBidAmt: IDL.Nat,
    endDate: IDL.Text,
    auctionType: AuctionDirectionType,
    minBidAmt: IDL.Nat,
    bids: List,
    name: IDL.Text,
    createdBy: IDL.Principal,
    description: IDL.Text,
    currency: IDL.Text,
    category: IDL.Text,
    location: IDL.Text,
    photos: List,
    startDate: IDL.Text,
  });
  List__1.fill(IDL.Opt(IDL.Tuple(AuctionType, List__1)));
  const Result_3 = IDL.Variant({ ok: List__1, err: Error });
  const Result_4 = IDL.Variant({ ok: IDL.Nat, err: Error });
  const Profile = IDL.Record({ id: IDL.Principal, bio: Bio });
  const Result_2 = IDL.Variant({ ok: Profile, err: Error });
  const Result_1 = IDL.Variant({ ok: AuctionResponse, err: Error });
  const ProfileUpdate = IDL.Record({ bio: Bio });
  return IDL.Service({
    bidOnAuction: IDL.Func([IDL.Text, IDL.Nat, IDL.Text], [IDL.Bool], []),
    convertPrincipalToText: IDL.Func([IDL.Principal], [IDL.Text], []),
    createAuction: IDL.Func([AuctionInput], [IDL.Opt(AuctionResponse)], []),
    createProfile: IDL.Func([Bio], [Result], []),
    deleteAuction: IDL.Func([IDL.Text], [Result], []),
    deleteProfile: IDL.Func([], [Result], []),
    findAuction: IDL.Func([IDL.Text], [IDL.Opt(AuctionType)], ["query"]),
    getAllAuctions: IDL.Func([], [Result_3], ["query"]),
    getAuctionBySellerId: IDL.Func([IDL.Text], [Result_3], ["query"]),
    getHighestBid: IDL.Func([IDL.Text], [IDL.Nat], []),
    getMyAuctionCount: IDL.Func([], [Result_4], []),
    getMyAuctions: IDL.Func([], [Result_3], []),
    getMyIdentity: IDL.Func([], [IDL.Text], []),
    getProfile: IDL.Func([], [Result_2], []),
    getProfileById: IDL.Func([IDL.Text], [Result_2], ["query"]),
    getProfileByPrincipalId: IDL.Func([IDL.Principal], [Result_2], []),
    getWinner: IDL.Func([IDL.Text], [IDL.Text], ["query"]),
    healthcheck: IDL.Func([], [IDL.Bool], []),
    updateAuction: IDL.Func([IDL.Text, AuctionInput], [Result_1], []),
    updateProfile: IDL.Func([ProfileUpdate], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
