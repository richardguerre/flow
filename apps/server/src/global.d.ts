type JsonValue = string | number | boolean | { [Key in string]?: JsonValue } | Array<JsonValue>;
