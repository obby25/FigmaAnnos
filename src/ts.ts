import { setAbsolutePosition, showUI } from "@create-figma-plugin/utilities";

export default function () {
  showUI({
    height: 600,
    width: 420,
    title: "UX ANNOTATOR",
    themeColors: false,
  });

  const userName = "umarrg";

  figma.root.setRelaunchData({ open: "" });

  function checkSelection() {
    if (figma.currentPage.selection.length === 0) {
      figma.ui.postMessage({
        type: "no-element-selected",
      });
    } else {
      figma.ui.postMessage({
        type: "element-selected",
        userName,
      });
    }
  }

  checkSelection();

  figma.on("selectionchange", () => {
    checkSelection();
  });

  function hexToRGB(hex: string) {
    hex = hex.slice(1);
    const value = parseInt(hex, 16);
    const r = ((value >> 16) & 255) / 255;
    const g = ((value >> 8) & 255) / 255;
    const b = (value & 255) / 255;
    return { r, g, b };
  }
  type listData = {
    title: string;
    subtitle: string;
    content: string;
    color: string;
    number: number;
    position: string;
    li: string;
    id: string;
    frame?: string;
  };
  const list: Array<listData> = [];
  const annotations: Array<listData> = [];
  const divList: Array<string> = [];
  let frame: any = null;
  function createAnnotation(
    title: string,
    subtitle: string,
    content: string,
    color: string,
    position: string,
    li: string,
    fr: string | undefined
  ) {
    let number = list.length;

    if (divList.indexOf(li) === -1) {
      divList.push(li);
      console.log("yes");
    }

    const selection = figma.currentPage.selection;
    const parentFrame = selection[0];

    const selectedFrame = figma.currentPage.selection[0];
    console.log("ss", parentFrame);
    function createFrame() {
      if (
        parentFrame.parent!.constructor.name === "PageNode" ||
        parentFrame.parent!.parent!.constructor.name === "PageNode"
      ) {
        console.log("sdd", selectedFrame.width);
        frame = figma.createFrame();
        frame.x = selectedFrame.x + selectedFrame.width;
        frame.y = selectedFrame.y;

        frame.resize(522, selectedFrame.height);
        frame.horizontalPadding = 20;
        frame.verticalPadding = 20;
        frame.fills = [
          {
            type: "SOLID",
            color: hexToRGB("#EBEBEB"),
          },
        ];
        let yOffset = 80;
        divList.forEach((item, idx) => {
          // yOffset = item == "List 1" ? 80 : selectedFrame.height / 2 + 60;
          // console.log(divList.length);

          const line = figma.createLine();
          line.x = selectedFrame.x + selectedFrame.width;
          line.y = selectedFrame.y + 35;
          line.resize(200, 0);
          line.strokeWeight = 3;
          line.strokes = [
            {
              type: "SOLID",
              color: hexToRGB("#BCBDBE"),
              opacity: 1,
            },
          ];
          const rec = figma.createRectangle();
          rec.resize(430, 40);
          rec.x = 200;
          rec.y = 15;
          rec.fills = [{ type: "SOLID", color: hexToRGB("#BCBDBE") }];
          rec.topLeftRadius = 20;
          rec.topRightRadius = 0;
          rec.bottomLeftRadius = 20;
          rec.bottomRightRadius = 0;
          const textNode = figma.createText();
          textNode.x = rec.x + 25;
          textNode.y = rec.y + 5;
          textNode.characters = item;
          textNode.fontName = {
            family: "Roboto Condensed",
            style: "Regular",
          };
          textNode.fontSize = 22;
          textNode.fills = [{ type: "SOLID", color: hexToRGB("#545454") }];
          frame.appendChild(rec);
          frame.appendChild(textNode);
        });

        list.forEach((data, idx) => {
          console.log("s", data.frame, "d", selectedFrame.parent?.name);
          if (
            data.id == selectedFrame.id ||
            data.frame == selectedFrame.parent?.name
          ) {
            const ellipseWidth = 36;
            const ellipseHeight = 36;
            // Create an ellipse
            const ellipse = figma.createEllipse();
            ellipse.x = 35;
            ellipse.y = yOffset;
            ellipse.fills = [{ type: "SOLID", color: hexToRGB(data.color) }];
            ellipse.strokes = [
              {
                type: "SOLID",
                color: hexToRGB("#FFFFFF"),
                opacity: 1, // Set the opacity
              },
            ];
            ellipse.strokeWeight = 2;
            ellipse.resize(ellipseWidth, ellipseHeight);
            let num = idx + 1;
            const text = figma.createText();
            text.characters = num.toString(); // Convert number to string
            text.x = ellipse.x + ellipseWidth / 3;
            text.y = ellipse.y + ellipseHeight / 6;
            text.fontName = { family: "Open Sans", style: "Regular" };
            text.fontSize = 20;

            text.fills = [{ type: "SOLID", color: hexToRGB("#FFFFFF") }]; // Set text color

            // Create the title
            const title = figma.createText();
            title.characters = data.title;
            title.x = 80;
            title.y = yOffset;
            title.fontSize = 16;
            title.fontName = { family: "Roboto", style: "Regular" };
            title.fontSize = 24;
            title.fills = [{ type: "SOLID", color: hexToRGB("#242424") }];

            const subtitle = figma.createText();
            subtitle.characters = data.subtitle;
            subtitle.x = 80;
            subtitle.y = yOffset + 24;
            subtitle.fontName = { family: "Roboto", style: "Regular" };
            subtitle.fontSize = 16;
            subtitle.fills = [{ type: "SOLID", color: hexToRGB("#242424") }];

            const content = figma.createText();
            content.characters = data.content;
            content.x = 80;
            content.y = yOffset + 50;
            content.fontName = { family: "Roboto", style: "Light" };
            content.fontSize = 14;
            content.fills = [{ type: "SOLID", color: hexToRGB("#242424") }];

            const divider = figma.createLine();
            divider.x = 50;
            divider.resize(386, 0);
            divider.y = yOffset + 70;
            divider.strokeWeight = 1;
            divider.strokes = [
              {
                type: "SOLID",
                color: hexToRGB("#B3B3B3"),
                opacity: 1,
              },
            ];

            yOffset += 80;

            frame.appendChild(ellipse);
            frame.appendChild(text);
            frame.appendChild(title);
            frame.appendChild(subtitle);
            frame.appendChild(content);
            frame.appendChild(divider);
          }
        });
      } else {
        console.log("select a frame first");
      }
    }

    createFrame();

    function createEllipse(position: string, idx: any, color: string) {
      const selectedNode = selection[0];
      const ellipse = figma.createEllipse();
      ellipse.resize(40, 40);
      const text = figma.createText();
      text.fontName = { family: "Open Sans", style: "Regular" };
      text.characters = idx.toString();

      text.fontSize = 24;

      text.fills = [{ type: "SOLID", color: hexToRGB("#FFFFFF") }];

      switch (position) {
        case "top":
          // frame.x = selectedNode.x + selectedNode.width / 2;
          // frame.y = selectedNode.y - 10;
          ellipse.x = selectedNode.x + selectedNode.width / 2;
          ellipse.y = selectedNode.y - 20;
          text.x = selectedNode.x + selectedNode.width / 2 + 6;
          text.y = selectedNode.y - 18;
          break;
        case "bottom":
          // frame.x = selectedNode.x + selectedNode.width / 2;
          // frame.y = selectedNode.y + selectedNode.height;
          ellipse.x = selectedNode.x + selectedNode.width / 2;
          ellipse.y = selectedNode.y + selectedNode.height;
          text.x = selectedNode.x + selectedNode.width / 2 + 6;
          text.y = selectedNode.y + selectedNode.height + 7;
          break;
        case "left":
          // frame.x = selectedNode.x - 10;
          // frame.y = selectedNode.y + selectedNode.height / 2;
          ellipse.x = selectedNode.x - 25;
          ellipse.y = selectedNode.y + selectedNode.height / 2;
          text.x = selectedNode.x - 15;
          text.y = selectedNode.y + selectedNode.height / 2 + 2;
          break;
        case "right":
          // frame.x = selectedNode.x + selectedNode.width;
          // frame.y = selectedNode.y + selectedNode.height / 2;
          ellipse.x = selectedNode.x + selectedNode.width;
          ellipse.y = selectedNode.y + selectedNode.height / 2;
          text.x = selectedNode.x + selectedNode.width + 8;
          text.y = selectedNode.y + selectedNode.height / 2 + 2;
          break;
        default:
          figma.notify(
            "Invalid position argument. Use 'top', 'bottom', 'left', or 'right'."
          );
          return;
      }

      ellipse.fills = [{ type: "SOLID", color: hexToRGB(color) }];
      ellipse.strokeWeight = 0;
      // Set the border radius (50% 50% 50% 50% / 60% 60% 40% 40%)

      //@ts-ignore

      //@ts-ignore
      selectedNode.parent.appendChild(ellipse);
      //@ts-ignore
      selectedNode.parent.appendChild(text);

      // figma.viewport.scrollAndZoomIntoView([ellipse]);
    }

    // createEllipse(position, number, color);
  }

  figma.ui.onmessage = async (message) => {
    if (message.type === "add-annotation") {
      console.log("CODE LOG", message);

      const fontsToLoad = [
        { family: "Roboto", style: "Regular" },
        { family: "Roboto", style: "Light" },
        { family: "Inter", style: "Regular" },
        { family: "Open Sans", style: "Regular" },
        { family: "Roboto Condensed", style: "Regular" },
      ];

      await Promise.all(
        fontsToLoad.map(async (font) => {
          await figma
            .loadFontAsync(font)
            .then(() => {
              // createAnnotation(message.position, message.title, message.content);
            })
            .catch((err) => console.log(err));
        })
      );
      const selectedObject = figma.currentPage.selection[0];
      if (message.position && message.title) {
        if (selectedObject) {
          list.push({
            title: message.title,
            content: message.content,
            color: message.bgColor,
            subtitle: message.subtitle,
            number: annotations.length,
            position: message.position,
            li: "FUNCTIONAL ANNOTATIONS",
            id: selectedObject.id,
            frame: selectedObject?.parent?.name,
          });

          createAnnotation(
            message.title,
            message.subtitle,
            message.content,
            message.bgColor,
            message.position,
            message.list,
            selectedObject?.parent?.name
          );
        } else {
          figma.notify("Please Select a object or frame");
        }
      }
    }
  };
}
