import * as fse from "fs-extra";

let result_json = {};

function check_key(object, father: Array<any>) {
  let main_join = father.join(".");

  if (object["description"]) {
    let key = main_join + ".description";

    if (result_json[key]) {
      console.log("重复", key, object);
    }

    result_json[key] = object["description"];
    object["description"] = `%${key}%`;
  }
  if (object["title"]) {
    let key = main_join + ".title";
    if (result_json[key]) {
      console.log("重复", key);
    }
    result_json[key] = object["title"];
    object["title"] = `%${key}%`;
  }
  if (object["name"]) {
    let key = main_join + ".name";
    if (result_json[key]) {
      console.log("重复", key);
    }
    result_json[key] = object["name"];
    object["name"] = `%${key}%`;
  }
  if (object["label"]) {
    let key = main_join + ".label";
    if (result_json[key]) {
      console.log("重复", key);
    }
    result_json[key] = object["label"];
    object["label"] = `%${key}%`;
  }
  if (object["enumDescriptions"]) {
    let key = main_join + ".enumDescriptions";
    if (result_json[key]) {
      console.log("重复", key);
    }
    for (let e_index = 0; e_index < object["enumDescriptions"].length; e_index++) {
      let b_key = key + `.${e_index}`;
      result_json[b_key] = object["enumDescriptions"][e_index];
    }
    // object["enumDescriptions"] = `%${key}%`;
  }
}

function print_obj(object, father) {
  let obj_key = object["command"] || object["id"];
  if (obj_key) {
    father.push(obj_key);
  }
  check_key(object, father);
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      const element = object[key];
      father.push(key);
      if (Array.isArray(element)) {
        print_arr(element, father);
      } else if (typeof element == "object") {
        print_obj(element, father);
      }
      father.pop();
    }
  }
  if (obj_key) {
    father.pop();
  }
}
function print_arr(object, father) {
  for (let i = 0; i < object.length; i++) {
    const element = object[i];

    if (Array.isArray(element)) {
      print_arr(element, father);
    } else if (typeof element == "object") {
      print_obj(element, father);
    }
  }
}

async function test() {
  let temp_data = await fse.readFile("./package.json", "utf8");
  let ob = JSON.parse(temp_data);
  print_obj(ob, ["main"]);
  await fse.writeFile("./nls.json", JSON.stringify(result_json));
  await fse.writeFile("./package.json", JSON.stringify(ob));
}

test();
