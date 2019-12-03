export default [
  {
    collectionName: "currencies",
    methods: ["get"]
  },
  {
    collectionName: "statuses",
    methods: ["get"]
  },
  {
    name: "account",
    collectionName: "accounts",
    methods: ["get", "update", "add", "remove"]
  }
];
