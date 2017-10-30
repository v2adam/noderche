import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../styles/draggableDashboard.css"
import { TableRow } from "../components/filterable/TableRow";
import { DraggableComponent } from "../components/draggable/DraggableComponent";
import _ from "lodash";
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    const sourceComponents = [];
    for(let i=0;i<10;i++){
      const comp = <TableRow product={{name : "A", price:i}}/>
      sourceComponents.push(
        <DraggableComponent x={i} y={i} id={i}
                            component={comp}
                            isSource={true}
                            deleteFromContainer={false}
                            onDragStartFunction={this.onComponentDragged}
                            key={i}/>
      )
    }
    this.state = {
      source: sourceComponents,
      target: [],
      draggedObject: {
        id : undefined,
        isSource : true,
        deleteFromContainer : false
      }
    }
  }

  allowDrop = (event,isSourceContainer) => {
    if(_.isUndefined(this.state.draggedObject.id)){
      return;
    }

    if (!isSourceContainer ||
      (!this.state.draggedObject.isSource && isSourceContainer )) {
      event.preventDefault();
    }
  };

  onComponentDragged = (component) => {
    this.setState({draggedObject:component})
  };

  onComponentDropped = (event,isSourceContainer) => {
    const component = this.state.draggedObject;

    if(_.isUndefined(component.id)) {
      return;
    }

    let newSource = this.state.source.slice();
    let newTarget = this.state.target.slice();
    const newComponent =
      <DraggableComponent {...component}
                          isSource={!component.isSource}
                          id={newTarget.length}
                          key={newTarget.length}/>;

    if (component.isSource) {
      if(component.deleteFromContainer) {
        newSource = newSource.filter(comp => comp.id !== component.id);
      }
      newTarget.push(newComponent);

    } else if(isSourceContainer) {
      newTarget = newTarget.filter(comp => comp.props.id !== component.id);
    }

    this.setState({ source: newSource, target:newTarget });
  };

  render() {
    return (
      <div id="dashboard" className="dashboard-container">
        <div id="source" className="sourceDiv"
             onDrop={(event) => this.onComponentDropped(event,true)}
             onDragOver={(event) => this.allowDrop(event,true)}>
          {this.state.source}
        </div>
        <div id="target" className="targetDiv"
             onDrop={(event) => this.onComponentDropped(event,false)}
             onDragOver={(event) => this.allowDrop(event,false)}>
          {this.state.target}
        </div>
      </div>
    );
  }
}

// itt lehetne a store-ból objektumokat meghivatkozni és használni
function mapStateToProps(state) {
  return {};
}

// itt lehetne actionöket behúzni, és 'bekapcsolni a keringésbe' (read more: dispatch )
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
