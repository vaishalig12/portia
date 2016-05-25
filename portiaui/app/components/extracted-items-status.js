import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    extractedItems: Ember.inject.service(),

    type: Ember.computed.readOnly('extractedItems.type'),
    changes: Ember.computed('extractedItems.changes', function() {
        return this.get('extractedItems.changes') || [];
    }),

    hasChanges: Ember.computed.gt('changes.length', 0),

    hasWarning: Ember.computed('type', 'changes', 'changes.length', function() {
        return ((this.get('type') === 'js' && this.get('changes').length < 1) ||
                this.get('hasChanges'));
    }),

    icon: Ember.computed('hasWarning', function() {
        return this.get('hasWarning') ? 'warning-triangle' : 'ok';
    }),
});
