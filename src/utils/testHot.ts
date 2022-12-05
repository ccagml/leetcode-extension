export function getSubmissionResult() {
  return JSON.stringify({
    messages: ["Finished"],
    system_message: {
      fid: "1796",
      id: 1904,
      qid: 1904,
      sub_type: "test",
      accepted: true,
    },
    "Your Input": ['"dfa12321afd"'],
    "Output (0 ms)": ["1"],
    "Expected Answer": ["2"],
    Stdout: [""],
  });
}

export function test_add_table(sections) {
  sections.push(`\n\n\n### aaaaaa\n`);
  sections.push(`| a1a1 | a2a2  |\n|  :---------:  | :---------:    |\n|  s1s1  | s2s2 | `);
  sections.push(`|  __\`aaaaaaaaa\`__  | bbbbbbbbbbb | `);
  sections.push(`|  __\`ccccccccccccc\`__  | __\`ddddddddddtext\`__ | `);
}
