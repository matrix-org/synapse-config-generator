import { connect } from 'react-redux';

import Done from '../components/Done';


const mapStateToProps = state => ({
    configDir: state.baseConfig.configDir,
});

const mapDispathToProps = (dispatch) => ({
});

export default connect(
    mapStateToProps,
    mapDispathToProps,
)(Done);
