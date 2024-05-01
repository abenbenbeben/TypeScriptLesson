type Mode = "normal" | "hard";

const nextActions = ["play again", "exit"] as const;
type NextAction = (typeof nextActions)[number];

const printline = (text: string, breakLine: boolean = true) => {
  process.stdout.write(text + (breakLine ? "\n" : ""));
};

const propmptInput = async (text: string) => {
  printline(`\n${text}\n>`, false);
  return readLine();
};

const readLine = async () => {
  const input: string = await new Promise((resolve) =>
    process.stdin.once("data", (data) => resolve(data.toString()))
  );
  return input.trim();
};

const promptSelect = async (
  text: string,
  values: readonly string[]
): Promise<string> => {
  printline(`\n${text}`);
  values.forEach((value) => {
    printline(`- ${value}`);
  });
  printline(`> `, false);

  const input = await readLine();
  if (values.includes(input)) {
    return input;
  } else {
    return promptSelect(text, values);
  }
};

class GameProcedure {
  private currentGameTitle = "hit and blow";
  private currentGame = new HitAndBlow();

  public async start() {
    await this.play();
  }

  private async play() {
    printline(`===\n${this.currentGameTitle}を開始します`);
    await this.currentGame.setting();
    await this.currentGame.play();
    this.currentGame.end();

    const action = (await promptSelect(
      "ゲームを続けますか？",
      nextActions
    )) as NextAction;
    if (action == "play again") {
      await this.play();
    } else if (action == "exit") {
      this.end();
    } else {
      const neverValue: never = action;
      throw new Error(`${neverValue} is an invalid action`);
    }
  }
  private end() {
    printline("ゲームは終了しました");
    process.exit();
  }
}

class HitAndBlow {
  private readonly answerSource = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  private answer: string[] = [];
  private tryCount = 0;
  private mode: Mode = "normal";

  private getAnswerLength() {
    switch (this.mode) {
      case "normal":
        return 3;
      case "hard":
        return 4;
      default:
        throw new Error(`${this.mode}は無効なモードです`);
    }
  }
  async setting() {
    this.mode = (await promptSelect("モードを入力してください", [
      "normal",
      "hard",
    ])) as Mode;
    const answerLength = this.getAnswerLength();
    while (this.answer.length < answerLength) {
      const randNum = Math.floor(Math.random() * this.answerSource.length);
      const selectedItem = this.answerSource[randNum];
      if (!this.answer.includes(selectedItem)) {
        this.answer.push(selectedItem);
      }
    }
  }

  private validate(inputArr: string[]) {
    const isLengthValid = inputArr.length === this.answer.length;
    const isAllAnswerSourceOption = inputArr.every((val) =>
      this.answerSource.includes(val)
    );
    const isAllDifferentValues = inputArr.every(
      (val, i) => inputArr.indexOf(val) === i
    );
    return isLengthValid && isAllAnswerSourceOption && isAllDifferentValues;
  }
  async play() {
    const answerLength = this.getAnswerLength();
    const inputArr = (
      await propmptInput(
        `「,」区切りで${answerLength}つの文字を入力してください。`
      )
    ).split(",");

    if (!this.validate(inputArr)) {
      printline("無効な入力です");
      await this.play();
      return;
    }
    const result = this.check(inputArr);

    if (result.hit !== this.answer.length) {
      printline(`---\nHit: ${result.hit}\nBlow: ${result.blow}\n---`);
      this.tryCount += 1;
      await this.play();
    } else {
      this.tryCount += 1;
    }
  }

  private check(input: string[]) {
    let hitCount = 0;
    let blowCount = 0;

    input.forEach((val, index) => {
      if (val === this.answer[index]) {
        hitCount += 1;
      } else if (this.answer.includes(val)) {
        blowCount += 1;
      }
    });

    return {
      hit: hitCount,
      blow: blowCount,
    };
  }

  end() {
    printline(`正解です！\n試行回数: ${this.tryCount}回`);
  }
}

(async () => {
  new GameProcedure().start();
})();
