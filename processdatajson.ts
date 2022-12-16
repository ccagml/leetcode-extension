import * as fse from "fs-extra";

async function test() {
  let temp_data = await fse.readFile("./resources/data.json", "utf8");
  let ob = JSON.parse(temp_data);
  await fse.writeFile("./resources/data.json", JSON.stringify(ob));
}

test();
