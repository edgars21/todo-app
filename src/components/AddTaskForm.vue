<template>
    <div class="base-pop-up-modal" :class="{isOpen: openClass, isShow: showClass}">
        <div @click="handleCloseFromOutside" class="base-pop-up-modal__bg-shadow"></div>
        <div class="base-pop-up-modal__core">
            <div class="base-pop-up-modal__core-outter">
                <div class="base-pop-up-modal__core-inner">
                    <div class="AddTaskForm">
                        <form @submit.prevent="handleSubmit">
                        <div class="AddTaskForm__heading">
                            <div class="AddTaskForm__title">
                            <label class="AddTaskForm__titleLabel">Title:</label>
                            <input v-model="formData.title" class="AddTaskForm__titleInput" />
                            </div>
                            <div class="AddTaskForm__priority">
                                <div class="AddTaskForm__priorityLabel">Priority:</div>
                                <PrioritySelector v-model="formData.priority"
                                ></PrioritySelector>
                            </div>
                        </div>

                        <div class="AddTaskForm__subTitle">
                            <label class="AddTaskForm__subTitleLabel">Sub title:</label>
                            <input v-model="formData.subTitle" class="AddTaskForm__subTitleInput" />
                        </div>

                        <div class="AddTaskForm__notes">
                            <label class="AddTaskForm__notesLabel">Notes:</label>
                            <textarea v-model="formData.notes" class="AddTaskForm__notesInput"></textarea>
                        </div>

                        <div class="AddTaskForm__actions">
                            <div class="AddTaskForm__btWrap">
                            <button @click="handleCloseFromOutside"
                                type="button"
                                class="AddTaskForm__bt AddTaskForm__btCancel"
                            >
                                Cancel
                            </button>
                            <button @click="handleSave"
                                type="submit" class="AddTaskForm__bt AddTaskForm__btSave">
                                Save
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
            </div>	
        </div>
    </div>    
</template>

<script>
import { ref, watch } from "vue";
import { useStore } from 'vuex'
import PrioritySelector from './PrioritySelector';

export default {
    components: {
        PrioritySelector
    },

    props: [
        "is-open",
    ],

    setup(props, context) {
        const store = useStore();
        const openClass = ref(false);
        const showClass = ref(false);
        const formData = ref({
            "title" : null,
            "subTitle" : null,
            "notes": null,
            "priority": 1,
        });


        function handleSubmit() {
            store.commit('addTask', formData.value);
        }

        function handleCloseFromOutside() {
            context.emit('closed');
        }

        function handleSave() {
            handleCloseFromOutside()
        }

        function clearFields() {
            formData.value = {
                "title" : null,
                "subTitle" : null,
                "notes": null,
                "priority": 1,
            }            
        }

        async function open() {
            clearFields();
            openClass.value = true;
            await new Promise((resolve) => {
                setTimeout(() => {resolve()}, 0);
            });
            showClass.value = true;
        }

        async function close() {
            showClass.value = false;
            await new Promise((resolve) => {
                setTimeout(() => {resolve()}, 300);
            });
            openClass.value = false;          
        }

        watch(() => props.isOpen, () => {
            if (props.isOpen === true) {
                open();
            } else if (props.isOpen === false) {
                close();
            }
        });
        
        return {
            formData,
            handleSubmit,
            openClass,
            showClass,
            handleCloseFromOutside,
            handleSave,
        }
    }
}
</script>


<style>
.AddTaskForm label, .AddTaskForm input {
    display: block;
}

.AddTaskForm {
    background-color: #ffffff;
    padding: 40px 30px;
    border-radius: 10px;  
}

.AddTaskForm__notes {
  margin-top: 20px;
}

.AddTaskForm__notesInput {
  resize: none;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
}

.AddTaskForm__btWrap {
  display: flex;
  margin: 0 -5px;
  justify-content: flex-end;
}

.AddTaskForm__bt {
  display: block;
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.AddTaskForm__btSave {
  background-color: royalblue;
  color: #fff;
  border: 0;
  box-shadow: none;
  padding: 5px 20px;
}

.AddTaskForm__btSave:hover {
  background-color: #3b5fcb;
}

.AddTaskForm__btSave:active {
  background-color: #2e4a9e;
}

.AddTaskForm__heading {
    display: flex;
    align-items: flex-end;
    overflow: hidden;
}

.AddTaskForm__priority {
    padding-top: 8px;
    position: relative;
}

.AddTaskForm__priorityLabel {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    transform: translateY(-60%);
}

.AddTaskForm__title {
    flex-grow: 1;
    padding-right: 20px;
}

.AddTaskForm__titleInput, .AddTaskForm__subTitleInput, .AddTaskForm__notesInput {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 5px 10px;
}

.AddTaskForm__titleLabel, .AddTaskForm__subTitleLabel, .AddTaskForm__notesLabel {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
}

.AddTaskForm__subTitle {
    margin-top: 20px;
}

.AddTaskForm__notes {
    margin-top: 20px;
}

.AddTaskForm__actions {
    margin-top: 10px;
    overflow: hidden;
}

.base-pop-up-modal {
    z-index: 999;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;   
}

.base-pop-up-modal.isOpen {
    display: block;
}

.base-pop-up-modal.isShow .base-pop-up-modal__bg-shadow {
    opacity: 0.8;
} 

.base-pop-up-modal.isShow .base-pop-up-modal__core-inner {
    opacity: 1;
    transform: translateY(0);
}   

.base-pop-up-modal__bg-shadow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    transition: opacity 0.2s ease-in;
    opacity: 0;		
}

.base-pop-up-modal__core {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
    max-width: 1110px;
    max-height: 100%;
    min-width: min(600px, 100%);
    box-sizing: border-box;    
}

.base-pop-up-modal__core-inner {
    position: relative;
    overflow-y: auto;
    transition: all 0.3s ease-in;
    opacity: 0;
    transform: translateY(100px);
    max-height: calc(100vh - 20px);
    max-height: -moz-calc(100vh - 20px);
    max-height: -webkit-calc(100vh - 20px);	    			
} 
</style>