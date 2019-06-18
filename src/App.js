import React, { PureComponent } from "react";
import StickyGrid from "./StickyGrid";
import AutoSizer from "react-virtualized-auto-sizer";
import "./App.css";

const HeaderCell = ({ index, style }) => (
  <div className="Cell" style={style}>
    Header {index}
  </div>
);

const TopLeftCell = ({ style }) => (
  <div className="Cell" style={style}>
    Top left
  </div>
);

const ColumnCell = ({ index, style, data }) => (
  <div className="Cell" style={style}>
    Column {index}
    {data.pinned.includes(index) ? (
      <button onClick={() => data.unPinItem(index)}>unPin</button>
    ) : (
      <button onClick={() => data.pinItem(index)}>Pin</button>
    )}
  </div>
);

const FooterCell = ({ index, style }) => (
  <div className="Cell" style={style}>
    Footer {index}
  </div>
);

const BottomLeftCell = ({ style }) => (
  <div className="Cell" style={style}>
    Bottom Left
  </div>
);

const Cell = ({ rowIndex, columnIndex, style }) => (
  <div className="Cell" style={style}>
    r{rowIndex}, c{columnIndex}
  </div>
);

class App extends PureComponent {
  state = {
    pinned: []
  };

  pinItem = index => {
    this.setState({
      pinned: [...this.state.pinned, index].sort((a, b) => a - b)
    });
  };

  unPinItem = index =>
    this.setState({
      pinned: this.state.pinned.filter(pin => pin !== index)
    });

  render() {
    return (
      <div>
        <AutoSizer
          style={{
            width: "100%",
            height: "100vh"
          }}
        >
          {({ height, width }) => (
            <StickyGrid
              rowCount={100}
              columnCount={100}
              columnWidth={index => (index === 0 ? 250 : 145)}
              rowHeight={() => 43}
              height={height}
              width={width}
              stickyRows={this.state.pinned}
              components={{
                HeaderCell: HeaderCell,
                TopLeftCell: TopLeftCell,
                BottomLeftCell: BottomLeftCell,
                ColumnCell: ColumnCell,
                FooterCell: FooterCell,
                DataCell: Cell
              }}
              itemData={{
                pinned: this.state.pinned,
                pinItem: this.pinItem,
                unPinItem: this.unPinItem
              }}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

export default App;
