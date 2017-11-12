const ProjectModule = (function() {
    return {
        getInstance: function() {
            return {
                participants: [],
                pricing: {},
                isBusy: false,

                init(participants, pricing) {
                    if (Array.isArray(participants)) {
                        this.participants = participants;
                    }
                    if (typeof pricing === 'object') {
                        this.pricing = pricing;
                    }
                },

                findParticipant(functor, callbackFunction) {

                    if (this.isBusy) {
                        return false;
                    }
                    let find = this;
                    this.isBusy = true;
                    setTimeout(function() {
                        let result = null;
                        for (let i = 0; i < find.participants.length; i++) {
                            if (functor(find.participants[i])) {
                                result = find.participants[i];
                                break;
                            }
                        }
                        find.isBusy = false;
                        callbackFunction(result);
                    });
                },

                findParticipants(functor, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(() => {
                        const functorResult = this.participants.filter(functor);
                        this.isBusy = false;
                        callbackFunction(functorResult);
                    });
                },

                addParticipant(participantObject, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(() => {
                        let err;
                        if (participantObject.hasOwnProperty('seniorityLevel')) {
                            this.participants.push(participantObject);
                        } else {
                            err = 'Wrong Participant';
                        }
                        if (typeof callbackFunction === 'function') {
                            this.isBusy = false;
                            callbackFunction(err);
                        }
                    });
                },

                removeParticipant(participantObject, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(() => {
                        try {
                            if (participantObject !== undefined &&
                                typeof participantObject === 'object' &&
                                "seniorityLevel" in participantObject) {

                                let removedParticipant = null;

                                for (let i = 0; i < this.participants.length; i++) {
                                    if (this.participants[i].firstName === participantObject.firstName &&
                                        this.participants[i].lastName === participantObject.lastName &&
                                        this.participants[i].seniorityLevel === participantObject.seniorityLevel) {
                                        removedParticipant = this.participants.splice(i, 1)[0];
                                        break;
                                    }
                                }
                                this.isBusy = false;

                                callbackFunction(removedParticipant);
                            } else {
                                throw new Error(err)
                            }
                        } catch (error) {
                            this.isBusy = false;
                            callbackFunction(null);
                        }
                        this.isBusy = false;
                    });
                },

                setPricing(participantPriceObject, callbackFunction) {
                    this.isBusy = true;
                    setTimeout(() => {
                        this.pricing = Object.assign({}, participantPriceObject);

                        this.isBusy = false;
                        callbackFunction();
                    });
                },

                calculateSalary(periodInDays) {
                    const hoursPerDay = 8;
                    let salary = 0;
                    let result = 0;

                    for (let i = 0; i < this.participants.length; i++) {
                        if (this.participants[i].seniorityLevel in this.pricing) {
                            salary += this.pricing[this.participants[i].seniorityLevel];
                        } else {
                            throw Error;
                        }
                    }
                    result = salary * hoursPerDay * periodInDays;
                    return result;
                }
            }
        }
    }
})();

module.exports = {
    firstName: 'Dmitry',
    secondName: 'Mezerny',
    task: ProjectModule.getInstance()
}
