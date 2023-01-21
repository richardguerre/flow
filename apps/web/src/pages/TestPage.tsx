import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {} from "react-relay";

export const testData = {
  someData: "some data",
};

export default () => {
  const { test } = useLoaderData() as { test: typeof testData };
  // const state = useExternalScript(
  //   "https://cdn.jsdelivr.net/gh/jquery/jquery@3.2.1/dist/jquery.min.js"
  // );
  useEffect(() => {
    console.log(test);
    // (async () => {
    //   const result = await fetch("https://cdn.jsdelivr.net/gh/richardguerre/flow@main/test.js");
    //   console.log(result);
    // })();
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
      {/* <Link to="about">About Us</Link> */}
    </div>
  );
};
