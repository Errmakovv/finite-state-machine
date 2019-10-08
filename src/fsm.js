class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;
        this.state = this.config.initial;
        this.unddo = null;
        this.reddo = null;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if(state in this.config.states) {
            this.unddo = this.state;
            this.state = state;
        }
        else throw Error('...');
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if(event in this.config.states[this.state].transitions){
            this.unddo = this.state;
            this.state=this.config.states[this.state].transitions[event];
        }
        else throw Error('...');
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.unddo = this.state;
        this.state = this.config.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let mas =[];
        if (event === undefined) {
            for( let state in this.config.states){
                mas.push(state);
            }
            return mas;
        }
        else {
            for( let state in this.config.states){
               if(event in this.config.states[state].transitions) mas.push(state);
            }
            return mas;
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.unddo == null) return false; 
        else {
            this.reddo = this.state;
            this.state = this.unddo;
            this.unddo = null;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.reddo == null) return false; 
        else {
            this.unddo = this.state;
            this.state = this.reddo;
            this.reddo = null;
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.unddo = null;
        this.reddo = null;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
