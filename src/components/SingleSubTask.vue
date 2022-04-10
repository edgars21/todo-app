<template>
    <div class="SingleSubTask" :class="{isShowFull: taskExpanded, isDone: taskData.archived, editMode: taskExpanded}">
        <div class="SingleSubTask__visible">
            <div class="SingleSubTask__heading" @click="handleExpandTitle">
                <div @click="handleDoneTask" class="SingleSubTask__done"></div>
                <div class="SingleSubTask__title" @click="handleEditMode">
                    <div class="SingleSubTask__titlePreview">{{ editData.title }}</div>
                    <div class="SingleSubTask__titleEdit">
                        <input class="SingleSubTask__titleEditInput" v-model="editData.title" />
                    </div>                    
                </div>
                <div class="SingleSubTask__priority">
                    <template v-if="editData.priority">
                        <div class="SingleSubTask__priorityLabel">Priority:</div>
                        <PrioritySelector :selected-value="taskExpanded ? editData.priority : taskData.priority"></PrioritySelector>
                    </template>
                </div>
            </div> 
        </div>
        <div class="SingleSubTask__hidden">
            <div @click="handleEditMode" class="SingleSubTask__subTitle">
                <div class="SingleSubTask__subTitlePreview">{{ editData.subTitle }}</div>
                <div class="SingleSubTask__subTitleEdit">
                    <input class="SingleSubTask__subTitleEditInput" v-model="editData.subTitle" />
                </div>
            </div>
            <div class="SingleSubTask__notes">
            <textarea class="SingleSubTask__notesInput" :value="editData.notes"></textarea>
            </div>
            <div class="SingleSubTask__actions">
                <div class="SingleSubTask__btWrap">
                <button class="SingleSubTask__bt SingleSubTask__btDelete" @click="handleDelete">Delete</button> 
                <button class="SingleSubTask__bt SingleSubTask__btCancel" @click="taskExpanded = !taskExpanded">Cancel</button>
                <button class="SingleSubTask__bt SingleSubTask__btSave" @click="handleUpdateTask">Save</button>
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
        PrioritySelector,
    },

    props: ["task-data"],

    setup(props, context) {
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

        function handleAddSubTask() {
            context.emit('addSubTask');
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
            handleAddSubTask,
        }
    }
}
</script>

<style>
.SingleSubTask__heading {
    padding: 10px 10px;
}

.SingleSubTask__title {
    padding-right: 20px;
    flex-grow: 1;
}

.SingleSubTask__heading:hover {
    background-color: #fafafa;
    cursor: pointer;
}

.SingleSubTask__hidden {
    padding: 5px 10px;
    display: none;
}

.SingleSubTask.isShowFull {
    background-color: #ffffff;
}

.SingleSubTask.isShowFull .SingleSubTask__hidden {
    display: block;
}

.SingleSubTask__notes {
    margin-top: 20px;
}

.SingleSubTask__notesInput {
    resize: none;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 5px 10px;
}

.SingleSubTask__actions {
    margin-top: 10px;
}

.SingleSubTask__btWrap {
    display: flex;
    margin: 0 -5px;
    justify-content: flex-end;
}

.SingleSubTask__bt {
    display: block;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.SingleSubTask__btSave {
    background-color: royalblue;
    color: #fff;
    border: 0;
    box-shadow: none;
    padding: 5px 20px;
}

.SingleSubTask__btDelete {
    background-color: transparent;
    color: red;
    border: 0;
    box-shadow: none;
    margin-right: auto;    
}

.SingleSubTask__btDelete:hover {
    text-decoration: underline;
}

.SingleSubTask__btSave:hover {
    background-color: #3b5fcb;
}

.SingleSubTask__btSave:active {
    background-color: #2e4a9e;
}

.SingleSubTask__heading {
    display: flex;
}

.SingleSubTask__priority {
    padding-top: 8px;
    position: relative;
}

.SingleSubTask__priorityLabel {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    transform: translateY(-60%);
}

.SingleSubTask.isShowFull .SingleSubTask__priorityLabel {
     visibility: visible;
}

.SingleSubTask__done {
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

.SingleSubTask__done:hover {
    border-color: #9FC088;
}

.SingleSubTask.isDone .SingleSubTask__done {
    background-color: #9FC088;
}

.SingleSubTask.isDone .SingleSubTask__done::after {
    content: "✓";
    display: block;
    color: #ffffff;
    font-size: 12px;
}

.SingleSubTask.isDone .SingleSubTask__title {
    text-decoration: line-through;
    opacity: 0.8;
}

.SingleSubTask__subTitle {
    position: relative;
    padding: 5px 5px;
    box-sizing: border-box;
    min-height: 28px;
}

.SingleSubTask__subTitle:hover {
    cursor: pointer;
}

.SingleSubTask__subTitleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.SingleSubTask__subTitleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.SingleSubTask__subTitleEditInput.isVisible {
    display: block;
}

.SingleSubTask__title {
    position: relative;
    padding: 5px 5px;
    box-sizing: border-box;
    min-height: 28px;
    margin-right: 10px;
}

.SingleSubTask__titleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.SingleSubTask__titleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.SingleSubTask__titleEditInput.isVisible {
    display: block;
}
</style>