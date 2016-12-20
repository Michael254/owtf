import React from 'react';
import Header from './Header';
import SideFilters from './SideFilters';
import Accordians from './Accordians';
import Toolbar from './Toolbar';
import {Notification} from 'react-notification';
import update from 'immutability-helper';

class Report extends React.Component {

    replaceContainer() {
        document.getElementById("app").parentElement.className = "container-fluid";
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedGroup: [],
            selectedType: [],
            selectedRank: [],
            selectedOwtfRank: [],
            selectedMapping: "",
            selectedStatus: []
        };

        this.updateFilter = this.updateFilter.bind(this);
        this.clearFilters = this.clearFilters.bind(this);
        this.updateReport = this.updateReport.bind(this);
    };

    getChildContext() {
        var context_obj = {
            selectedType: this.state.selectedType,
            selectedGroup: this.state.selectedGroup,
            selectedRank: this.state.selectedRank,
            selectedOwtfRank: this.state.selectedOwtfRank,
            selectedStatus: this.state.selectedStatus,
            selectedMapping: this.state.selectedMapping,
            updateFilter: this.updateFilter,
            clearFilters: this.clearFilters,
            updateReport: this.updateReport
        };

        return context_obj;
    };

    updateFilter(filter_type, val) {
        var type;
        if (filter_type === 'plugin_type') {
            type = 'selectedType';
        } else if (filter_type === 'plugin_group') {
            type = 'selectedGroup';
        } else if (filter_type === 'user_rank') {
            type = 'selectedRank';
        } else if (filter_type === 'owtf_rank') {
            type = 'selectedOwtfRank';
        } else if (filter_type === 'mapping') {
            this.setState({selectedMapping: val});
            return;
        } else if (filter_type === 'status') {
            type = 'selectedStatus';
        }

        var index = this.state[type].indexOf(val);
        if (index > -1) {
            this.setState({
                [type]: update(this.state[type], {
                    $splice: [
                        [index, 1]
                    ]
                })
            });
        } else {
            this.setState({
                [type]: update(this.state[type], {$push: [val]})
            });
        }

    };

    updateReport() {
        location.reload();
    };

    clearFilters() {
        $(".filterCheckbox").attr("checked", false);
        this.setState({
            selectedStatus: [],
            selectedRank: [],
            selectedGroup: [],
            selectedMapping: "",
            selectedOwtfRank: [],
            selectedType: []
        });
    };

    render() {
        this.replaceContainer();
        return (
            <div>
                <Header/>
                <div className="row">
                    <div className="col-sm-2 col-md-2 col-lg-2" id="plugin_nav">
                        <SideFilters selectedGroup={this.state.selectedGroup} selectedType={this.state.selectedType}/>
                    </div>
                    <div className="col-sm-10 col-md-10 col-lg-10">
                        <Toolbar selectedRank={this.state.selectedRank}/>
                        <br/>
                        <Accordians/>
                    </div>
                </div>
            </div>
        );
    }
}

Report.childContextTypes = {
    selectedType: React.PropTypes.array,
    selectedRank: React.PropTypes.array,
    selectedGroup: React.PropTypes.array,
    selectedOwtfRank: React.PropTypes.array,
    selectedStatus: React.PropTypes.array,
    selectedMapping: React.PropTypes.string,
    updateFilter: React.PropTypes.func,
    updateReport: React.PropTypes.func,
    clearFilters: React.PropTypes.func
};

export default Report;