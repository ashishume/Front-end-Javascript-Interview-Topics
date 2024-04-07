import { useEffect, useState } from "react";
import "./style.scss";
import { Button } from "@/components/ui/button";
const Walkthrough = () => {
  const steps = ["3", "header", "8", "12", "footer", "5"];
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState({
    left: 0,
    top: 0,
  } as any);
  useEffect(() => {
    /** load the first walkthrough element */
    const el = document.getElementById(steps[index]);
    showTooltip(el);
  }, [index]);

  /**
   * show the tooltip with target element position
   * @param el
   */
  function showTooltip(el: any) {
    const client = el.getBoundingClientRect();
    highlightElement(client, el);
    const { width, height, left, top } = client;
    setPosition((prev: any) => ({
      ...prev,
      //position around center of the element
      left: left + width / 2 - 100,
      top:
        /** if the tooltip reaches at the bottom of the screen then minus the height of the tooltip to shift the positon upwards */
        window.innerHeight - (top + height) < 150
          ? top + height - 150
          : top + height,
    }));
  }

  /**
   * highlight element
   * @param bounds
   * @param targetEl
   */
  function highlightElement(bounds: any, targetEl: any) {
    targetEl.style.border = "solid 5px black";
  }

  /**
   *
   * @param id remove element highlight
   */
  function removeElementHighlight(id: string) {
    const targetEl = document.getElementById(id) as any;
    targetEl.style.border = "none";
  }

  function prevElement() {
    removeElementHighlight(steps[index]);

    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  }
  function nextElement() {
    removeElementHighlight(steps[index]);

    if (index < steps.length - 1) {
      setIndex((prev) => prev + 1);
    }
    if (index === steps.length - 1) {
      //hide the tooltip
      setPosition({
        left: 0,
        top: 0,
      });
    }
  }

  return (
    <div>
      <div className="widget-container">
        {!(position?.left === 0 && position?.top === 0) ? (
          <div className="overlay"></div>
        ) : null}
        {!(position?.left === 0 && position?.top === 0) ? (
          <div
            className="widget-tooltip"
            style={{
              top: `${position?.top}px`,
              left: `${position?.left}px`,
            }}
          >
            <div className="actions">
              <Button onClick={prevElement}>Prev</Button>

              {index === steps?.length - 1 ? (
                <Button onClick={nextElement}>Finish</Button>
              ) : (
                <Button onClick={nextElement}>Next</Button>
              )}
            </div>
          </div>
        ) : null}
        <header id="header" className="widget-section">
          {" "}
          Header{" "}
        </header>
        <div id="widget-wrapper">
          <div id="1" className="widget-block">
            1
          </div>
          <div id="2" className="widget-block">
            2
          </div>
          <div id="3" className="widget-block">
            3
          </div>
          <div id="4" className="widget-block">
            4
          </div>
          <div id="5" className="widget-block">
            5
          </div>
          <div id="6" className="widget-block">
            6
          </div>
          <div id="7" className="widget-block">
            7
          </div>
          <div id="8" className="widget-block">
            8
          </div>
          <div id="9" className="widget-block">
            9
          </div>
          <div id="10" className="widget-block">
            10
          </div>
          <div id="11" className="widget-block">
            11
          </div>
          <div id="12" className="widget-block">
            12
          </div>
          <div id="13" className="widget-block">
            13
          </div>
          <div id="14" className="widget-block">
            14
          </div>
          <div id="15" className="widget-block">
            15
          </div>
          <div id="16" className="widget-block">
            16
          </div>
          <div id="17" className="widget-block">
            17
          </div>
          <div id="18" className="widget-block">
            18
          </div>
        </div>
        <footer id="footer" className="widget-section">
          {" "}
          Footer{" "}
        </footer>
      </div>
    </div>
  );
};

export default Walkthrough;
