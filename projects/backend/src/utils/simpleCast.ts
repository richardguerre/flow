import { NexusOutputFieldConfigWithName } from "nexus/dist/core";

/**
 * @example
 * t.field({
 *  ...simpleCast(Type.field, (val) => val.someTransformation())
 * })
 */
export const simpleCast = <T extends string, U extends string>(
  field: NexusOutputFieldConfigWithName<T, U>,
  mold: (val: any) => any
): NexusOutputFieldConfigWithName<T, U> => {
  return {
    ...field,
    resolve: (parent: any) => mold(parent[field.name]),
  };
};
