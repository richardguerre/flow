import { useEffect } from "react";

export const testData = {
  someData: "some data",
};

export default () => {
  const { test } = { test: testData };
  // const state = useExternalScript(
  //   "https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js"
  // );
  useEffect(() => {
    console.log(test);
    (async () => {
      const result = await fetch("https://cdn.jsdelivr.net/gh/richardguerre/flow@main/test.js");
      console.log(result);
      // @ts-ignore
      const result2 = await import("https://cdn.jsdelivr.net/gh/richardguerre/flow@main/test2.js");
      result2.testFn();
    })();
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
      {/* <Link to="about">About Us</Link> */}
    </div>
  );
};
