import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "../styles/draggableDashboard.css"
import FilterableDemoContainer from "../containers/filterableDemoContainer";
import _ from "lodash";
import {Responsive, WidthProvider} from 'react-grid-layout';
import { DraggableComponent } from "../components/draggable/DraggableComponent";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


class DashboardContainer extends Component {

  static defaultProps = {
    className: "layout",
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    rowHeight: 100,
    target : [],
    source : []
  };

  constructor(props) {
    super(props);
    const sourceComponents = [];
    for(let i=0;i<10;i++){
      const comp = <FilterableDemoContainer/>;
      sourceComponents.push(
        <DraggableComponent id={i}
                            component={comp}
                            isSource={true}
                            deleteFromContainer={false}
                            onDragStartFunction={this.onComponentDragged}
                            key={i}/>
      )
    }
    this.state = {
      source: sourceComponents,
      target: this.props.target,
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
    if(!component.isSource){
      const newTarget = this.state.target.filter(comp => comp.id !== component.id);
      this.setState({ draggedObject:component, target:newTarget });
    } else {
      this.setState({ draggedObject:component});
    }
  };

  onComponentDropped = (event,isSourceContainer) => {
    const component = this.state.draggedObject;

    if(_.isUndefined(component.id)) {
      return;
    }

    let newTarget = this.state.target.slice();
    let newLayout = _.isUndefined(this.state.layout) ? [] : this.state.layout.lg.slice();
    const index = newTarget.length;
    const newComponent = {
      id : index,
      item :
          <DraggableComponent {...component}
                              onRemoveItem = {this.onRemoveItem}
                              isSource={false}
                              id={index}/>
    };
    console.log(event);
    if (component.isSource) {
      newTarget.push(newComponent);
      newLayout.push({
        x : 0,
        y : index*2,
        h : 2,
        w : 2,
        i : index.toString()});
    } else if(isSourceContainer) {
      newTarget = newTarget.filter(comp => comp.props.id !== component.id);
    }

    this.setState({ target:newTarget, layout: {lg : newLayout}});
  };

  onRemoveItem = (i) =>{
    this.setState({target: _.reject(this.state.target, {id: i})});
  };

  onLayoutChange = (layout, allLayout) =>{
    this.setState({layout : allLayout});
  };

  createComponent = (component) => {
    const o = (
      <div key={component.id.toString()} className={"resizable-box"}>
        {component.item}
      </div>
    );
    console.log(this.state);
    return o;
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
          <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange}
                                     {...this.props} layouts={this.state.layout}
                                     compactType={'vertical'}>
            {_.map(this.state.target, (el) => this.createComponent(el))}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    );
  }
}

function initialLayout() {
  return [{}];
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