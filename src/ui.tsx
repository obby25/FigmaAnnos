import { render, IconButton } from "@create-figma-plugin/ui";
import { h } from "preact";
import "!./output.css";
import { GrAddCircle } from "react-icons/gr";
import { useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { on } from "@create-figma-plugin/utilities";

const colors = [
  {
    color: "bg-red-500",
  },
  {
    color: " bg-cyan-400",
  },
  {
    color: " bg-green-500",
  },
  {
    color: "bg-orange-500",
  },
];

function Plugin() {
  const [red, setRed] = useState(true);
  const [cyan, setCyan] = useState(false);
  const [green, setGreen] = useState(false);
  const [orange, setOrange] = useState(false);
  const [black, setBlack] = useState(false);
  const [gray, setGray] = useState(false);
  const [indigo, setIndigo] = useState(false);
  const [purplr, setPurple] = useState(false);
  const [position, setPosition] = useState("left");
  const [title, setTitle] = useState("");
  const [subtitle, setsubTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeColor, setActiveColor] = useState("#ef4444");
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [left, setLeft] = useState(true);
  const [right, setRight] = useState(false);
  const [activeList, setActiveList] = useState("FUNCTIONAL ANNOTATIONS");

  const [list, setList] = useState(["FUNCTIONAL ANNOTATIONS"]);
  const col = [
    {
      color: "bg-red-500",
      value: red,
      hex: "#ef4444",
      onClick: () => {
        setActiveColor("#ef4444");
        setRed(true);
        setCyan(false);
        setGreen(false);
        setOrange(false);
        setBlack(false);
        setGray(false);
        setIndigo(false);
        setPurple(false);
      },
    },
    {
      color: " bg-cyan-400",
      hex: "#22d3ee",
      value: cyan,
      onClick: () => {
        setCyan(true);
        setActiveColor("#22d3ee");
        setRed(false);
        setGreen(false);
        setOrange(false);
        setBlack(false);
        setGray(false);
        setIndigo(false);
        setPurple(false);
      },
    },
    {
      color: "bg-green-500",
      hex: "#22c55e",
      value: green,
      onClick: () => {
        setActiveColor("#22c55e");
        setRed(false);
        setCyan(false);
        setGreen(true);
        setOrange(false);
        setBlack(false);
        setGray(false);
        setIndigo(false);
        setPurple(false);
      },
    },
    {
      color: "bg-orange-500",
      hex: "#f97316",
      value: orange,
      onClick: () => {
        setRed(false);
        setActiveColor("#f97316");
        setCyan(false);
        setGreen(false);
        setOrange(true);
        setBlack(false);
        setGray(false);
        setIndigo(false);
        setPurple(false);
      },
    },
  ];
  const allColors = [
    {
      color: "bg-black",
      value: black,
      hex: "#000000",
      onClick: () => {
        setActiveColor("#000000");
        setRed(false);
        setCyan(false);
        setGreen(false);
        setOrange(false);
        setBlack(true);
        setGray(false);
        setIndigo(false);
        setPurple(false);
      },
    },
    {
      color: "bg-gray-500",
      hex: "#BDBDBD",
      value: gray,
      onClick: () => {
        setActiveColor("#BDBDBD");
        setRed(false);
        setCyan(false);
        setGreen(false);
        setOrange(false);
        setBlack(false);
        setGray(true);
        setIndigo(false);
        setPurple(false);
      },
    },
    {
      color: "bg-indigo-500",
      hex: "#3F51B5",
      value: indigo,
      onClick: () => {
        setActiveColor("#3F51B5");
        setRed(false);
        setCyan(false);
        setGreen(false);
        setOrange(false);
        setBlack(false);
        setGray(false);
        setIndigo(true);
        setPurple(false);
      },
    },
    {
      color: "bg-purple-500",
      hex: "#673AB7",
      value: purplr,
      onClick: () => {
        setActiveColor("#673AB7");
        setRed(false);
        setCyan(false);
        setGreen(false);
        setOrange(false);
        setBlack(false);
        setGray(false);
        setIndigo(false);
        setPurple(true);
      },
    },
  ];
  const [colors, setColors] = useState(col);
  const addColor = () => {
    const randomIndex = Math.floor(Math.random() * allColors.length);
    if (!colors.includes(allColors[randomIndex])) {
      setColors([...colors, allColors[randomIndex]]);
    } else {
      console.log("The arrays do not have the same items.");
    }

    // allColors.splice(randomIndex, 1);
  };

  const directions = [
    {
      name: "right",
      image:
        "https://firebasestorage.googleapis.com/v0/b/contactme-2970e.appspot.com/o/left1.svg?alt=media&token=277c4b72-48a5-49dc-b38c-3b4071250466&_gl=1*yn7ltc*_ga*MTY5MzAwNzM2Ny4xNjkzMTY5NDM2*_ga_CW55HF8NVT*MTY5NzgxNzY2Ni41NC4xLjE2OTc4MTc5MTIuNjAuMC4w",
      value: right,
      handle: () => {
        setLeft(true);
        setTop(false);
        setRight(false);
        setBottom(false);
        setPosition("right");
      },
    },
    {
      name: "left",
      image:
        "https://firebasestorage.googleapis.com/v0/b/contactme-2970e.appspot.com/o/right1.svg?alt=media&token=7c2b5cb8-93c0-4775-aa2d-dc581ca1cc94&_gl=1*371jgi*_ga*MTY5MzAwNzM2Ny4xNjkzMTY5NDM2*_ga_CW55HF8NVT*MTY5NzgxNzY2Ni41NC4xLjE2OTc4MTgyMTguMi4wLjA.",
      value: left,
      handle: () => {
        setLeft(false);
        setTop(false);
        setRight(true);
        setBottom(false);
        setPosition("left");
      },
    },

    {
      name: "top",
      image:
        "https://firebasestorage.googleapis.com/v0/b/contactme-2970e.appspot.com/o/bottom1.svg?alt=media&token=c0d3df8e-4d56-46d7-af28-41888d6fc839&_gl=1*1fnsnqq*_ga*MTY5MzAwNzM2Ny4xNjkzMTY5NDM2*_ga_CW55HF8NVT*MTY5NzgxNzY2Ni41NC4xLjE2OTc4MTc4MjUuNi4wLjA.",
      value: top,
      handle: () => {
        setLeft(false);
        setTop(false);
        setRight(false);
        setBottom(true);
        setPosition("top");
      },
    },
    {
      name: "bottom",
      image:
        "https://firebasestorage.googleapis.com/v0/b/contactme-2970e.appspot.com/o/top1.svg?alt=media&token=6a02e0db-fbf4-4b09-a3b8-849461dbf70c&_gl=1*1kze6i*_ga*MTY5MzAwNzM2Ny4xNjkzMTY5NDM2*_ga_CW55HF8NVT*MTY5NzgxNzY2Ni41NC4xLjE2OTc4MTgxOTYuMjQuMC4w",
      value: bottom,
      handle: () => {
        setLeft(false);
        setTop(true);
        setRight(false);
        setBottom(false);
        setPosition("bottom");
      },
    },
  ];

  function clicks() {
    let star = "*";
    const bgColor = activeColor;
    const theme = "dark";
    let showAuthor = false;
    let list = activeList;

    parent.postMessage(
      {
        pluginMessage: {
          type: "add-annotation",
          position,
          title,
          content,
          theme,
          showAuthor,
          bgColor,
          subtitle,
          list,
        },
      },
      star
    );
    setTitle("");
    setsubTitle("");
    setContent("");
  }

  const addList = () => {
    let num = list.length + 1;
    let ls = "List " + num;
    setList([...list, ls]);

    let star = "*";

    // parent.postMessage(
    //   {
    //     pluginMessage: {
    //       type: "add-list",
    //     },
    //   },
    //   star
    // );
  };
  const addTest = () => {
    let star = "*";

    parent.postMessage(
      {
        pluginMessage: {
          type: "add-test",
        },
      },
      star
    );
  };

  const handleList = (data: any) => {
    setActiveList(data);
  };

  return (
    <div className="py-4 px-4" style={{ background: "#2c2c2c" }}>
      {/* <div className="flex items-center gap-4 flex-wrap">
        {list.map((item, idx) => (
          <div
            key={idx}
            style={{ backgroundColor: activeColor }}
            onClick={() => handleList(item)}
            className={
              item == activeList
                ? ` rounded-lg  font-semibold	border-stone-300 border	 text-black`
                : ` rounded-lg  font-semibold	 text-black`
            }
          >
            <div className="py-2 px-4">{item}</div>
          </div>
        ))}
        <IoAddCircleOutline size={30} color="#383838" onClick={addList} />
      </div> */}
      <div>
        <h4 className="py-3 text-stone-300  text-sm font-bold">
          Select Indicators color
        </h4>

        {/* <LeftIcon /> */}

        <div className="flex items-center gap-4">
          {colors.map((item, idx) => (
            <div
              key={idx}
              onClick={item.onClick}
              className={
                item.hex == activeColor
                  ? "cursor-pointer p-1 rounded-full border-2 border-stone-300 "
                  : "cursor-pointer p-1 rounded-full border-2 border-neutral-700"
              }
            >
              <div
                className={`p-2 ${item.color} rounded-full cursor-pointer`}
              ></div>
            </div>
          ))}

          <div className="cursor-pointer" onClick={addColor}>
            <IoAddCircleOutline size={30} color="#383838" />
            {/* <GrAddCircle size={20} /> */}
          </div>
        </div>
      </div>
      <div>
        <h4 className="py-3 text-stone-300  text-sm font-bold">
          Select indicator direction{" "}
        </h4>
        <button
          onClick={addTest}
          className={"font-bold underline text-xl py-6 text-stone-300 "}
        >
          Click test
        </button>
        <div className={"flex items-center gap-4 w-80 mb-2"}>
          {directions.map((item) => (
            <div
              onClick={item.handle}
              className={
                item.value
                  ? "  cursor-pointer  rounded-xl border-2 px-2 border-stone-300"
                  : "  cursor-pointer  rounded-xl border-2 px-2    border-neutral-700"
              }
            >
              <img src={item.image} alt={item.name} className={" w-20 h-16"} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-5">
        <h4 className="pb-2 text-stone-300  text-xs font-bold">TITLE</h4>
        <input
          type="text"
          value={title}
          className="w-full mb-2 h-10 bg-neutral-700 px-2 text-white"
          onChange={(e: any) => setTitle(e.target.value)}
        />
        <h4 className="mb-2 text-stone-300   text-xs font-bold">SUB TITLE</h4>
        <input
          type="text"
          value={subtitle}
          className="w-full h-10 mb-2 text-white bg-neutral-700 px-2"
          onChange={(e: any) => setsubTitle(e.target.value)}
        />
        <h4 className="mb-2 text-stone-300  text-xs font-bold">COMMENT</h4>
        <textarea
          type="text"
          value={content}
          onChange={(e: any) => setContent(e.target.value)}
          className="w-full h-28 mb-2 text-white bg-neutral-700 px-2 py-2"
        />
      </div>
      <div className="flex justify-end items-center gap-3 pt-2">
        <h4 className="text-stone-300  text-xs font-bold">ADD ANNOTATION</h4>
        <div onClick={() => clicks()} className={"cursor-pointer text-white"}>
          <IoAddCircleOutline size={40} />
        </div>
      </div>
    </div>
  );
}

export default render(Plugin);
