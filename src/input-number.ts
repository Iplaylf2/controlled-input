import { SyncMapBuilder, SyncHandle } from "./sync-map-builder";

class InputNumber {
  load(handleList: SyncHandle<InputNumberValue, InputNumberConfig>[]) {
    const builder = handleList.reduceRight(
      (builder, handle) => builder.use(handle),
      SyncMapBuilder.create<InputNumberValue, InputNumberConfig>()
    );
    return builder.build.bind(builder);
  }
}

export type InputNumberValue = {
  text: string;
};

export type InputNumberConfig = {
  max: number;
  min: number;
  step: number;
};
