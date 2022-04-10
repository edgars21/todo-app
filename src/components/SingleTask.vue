<template>
    <div class="SingleTask" :class="{isShowFull: taskExpanded, isDone: taskData.archived, editMode: taskExpanded}">
        <div class="SingleTask__visible">
            <div class="SingleTask__heading" @click="handleExpandTitle">
                <div @click="handleDoneTask" class="SingleTask__done"></div>
                <div class="SingleTask__title" @click="handleEditMode">
                    <div class="SingleTask__titlePreview">{{ editData.title }}</div>
                    <div class="SingleTask__titleEdit">
                        <input class="SingleTask__titleEditInput" v-model="editData.title" />
                    </div>                    
                </div>
                <div class="SingleTask__priority">
                    <template v-if="editData.priority">
                        <div class="SingleTask__priorityLabel">Priority:</div>
                        <PrioritySelector :selected-value="taskExpanded ? editData.priority : taskData.priority"></PrioritySelector>
                    </template>
                </div>
            </div> 
        </div>
        <div class="SingleTask__hidden">
            <div @click="handleEditMode" class="SingleTask__subTitle">
                <div class="SingleTask__subTitlePreview">{{ editData.subTitle }}</div>
                <div class="SingleTask__subTitleEdit">
                    <input class="SingleTask__subTitleEditInput" v-model="editData.subTitle" />
                </div>
            </div>
            <div class="SingleTask__notes">
            <textarea class="SingleTask__notesInput" :value="editData.notes"></textarea>
            </div>
            <div class="SingleTask__actions">
                <div class="SingleTask__btWrap">
                <button class="SingleTask__bt SingleTask__btDelete" @click="handleDelete">Delete</button> 
                <button class="SingleTask__bt SingleTask__btCancel" @click="taskExpanded = !taskExpanded">Cancel</button>
                <button class="SingleTask__bt SingleTask__btSave" @click="handleUpdateTask">Save</button>
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

    props: ["task-data"],

    setup(props) {
        const store = useStore();
        const taskExpanded = ref(false);
        const editData = ref({
                "title" : props.taskData.title,
                "subTitle" : props.taskData.subTitle,
                "notes": props.taskData.notes,
                "priority": props.taskData.priority,
                "archived": props.taskData.archived,
        });
        
        function clearEditData() {
            editData.value = {
                "title" : props.taskData.title,
                "subTitle" : props.taskData.subTitle,
                "notes": props.taskData.notes,
                "priority": props.taskData.priority,
            };            
        }

        function handleDelete() {
            store.commit('removeTask', props.taskData);
        }

        function handleExpandTitle() {
            if (taskExpanded.value === false) {
                taskExpanded.value = true;
            }
        }

        function handleDoneTask() {
            if (props.taskData.archived === true) {
                store.commit('unArchiveTask', props.taskData);
            } else {
                store.commit('archiveTask', props.taskData);
            }
        }

        function handleUpdateTask() {
            const data = {
                oldData: props.taskData,
                newData: editData.value,
            }
            store.commit('updateTask', data);
            taskExpanded.value = false;
        }

        async function handleEditMode(e) {
            if (!taskExpanded.value) return;
            console.log('edit modes');
            const editInput = e.currentTarget.querySelector('input');
            editInput.classList.add('isVisible')
            const handleFocusOut = function() {
                editInput.classList.remove('isVisible');
                editInput.removeEventListener('blur', handleFocusOut);
            }
            editInput.addEventListener('blur', handleFocusOut);
            editInput.focus();
        }

        watch(taskExpanded, () => {
            clearEditData();
        }) 

        return {
            taskExpanded,
            handleDelete,
            handleDoneTask,
            handleEditMode,
            editData,
            handleExpandTitle,
            handleUpdateTask,
        }
    }
}
</script>


<style>
.SingleTask__heading {
    padding: 10px 10px;
}

.SingleTask__title {
    padding-right: 20px;
    flex-grow: 1;
}

.SingleTask__heading:hover {
    background-color: #fafafa;
    cursor: pointer;
}

.SingleTask__hidden {
    padding: 5px 10px;
    display: none;
}

.SingleTask.isShowFull {
    background-color: #f6f6f6;
}

.SingleTask.isShowFull .SingleTask__hidden {
    display: block;
}

.SingleTask__notes {
    margin-top: 20px;
}

.SingleTask__notesInput {
    resize: none;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 5px 10px;
}

.SingleTask__actions {
    margin-top: 10px;
}

.SingleTask__btWrap {
    display: flex;
    margin: 0 -5px;
    justify-content: flex-end;
}

.SingleTask__bt {
    display: block;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.SingleTask__btSave {
    background-color: royalblue;
    color: #fff;
    border: 0;
    box-shadow: none;
    padding: 5px 20px;
}

.SingleTask__btDelete {
    background-color: transparent;
    color: red;
    border: 0;
    box-shadow: none;
    margin-right: auto;    
}

.SingleTask__btDelete:hover {
    text-decoration: underline;
}

.SingleTask__btSave:hover {
    background-color: #3b5fcb;
}

.SingleTask__btSave:active {
    background-color: #2e4a9e;
}

.SingleTask__heading {
    display: flex;
}

.SingleTask__priority {
    padding-top: 8px;
    position: relative;
}

.SingleTask__priorityLabel {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    transform: translateY(-60%);
}

.SingleTask.isShowFull .SingleTask__priorityLabel {
     visibility: visible;
}

.SingleTask__done {
    width: 15px;
    height: 15px;
    border: 1px solid gray;
    border-radius: 50%;
    margin-top: 4px;
    margin-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.SingleTask__done:hover {
    border-color: #9FC088;
}

.SingleTask.isDone .SingleTask__done {
    background-color: #9FC088;
}

.SingleTask.isDone .SingleTask__done::after {
    content: "✓";
    display: block;
    color: #ffffff;
    font-size: 12px;
}

.SingleTask.isDone .SingleTask__title {
    text-decoration: line-through;
    opacity: 0.8;
}

.SingleTask__subTitle {
    position: relative;
    padding: 5px 5px;
    box-sizing: border-box;
    min-height: 28px;
}

.SingleTask__subTitle:hover {
    cursor: pointer;
}

.SingleTask__subTitleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.SingleTask__subTitleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.SingleTask__subTitleEditInput.isVisible {
    display: block;
}

.SingleTask__title {
    position: relative;
    padding: 5px 5px;
    box-sizing: border-box;
    min-height: 28px;
    margin-right: 10px;
}

.SingleTask__titleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.SingleTask__titleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.SingleTask__titleEditInput.isVisible {
    display: block;
}
</style>