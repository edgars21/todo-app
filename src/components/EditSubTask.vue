<template>
    <div class="EditSingleSubTask" :class="{isDone: taskData.archived}">
        <div class="EditSingleSubTask__heading">
            <div @click="handleDoneTask" class="EditSingleSubTask__done"></div>
            <div class="EditSingleSubTask__title" @click="handleEditMode">
                <div class="EditSingleSubTask__titlePreview">{{ editData.title }}</div>
                <div class="EditSingleSubTask__titleEdit">
                    <input class="EditSingleSubTask__titleEditInput" v-model="editData.title" />
                </div>                    
            </div>
            <div class="EditSingleSubTask__priority">
                <template v-if="editData.priority">
                    <div class="EditSingleSubTask__priorityLabel">Priority:</div>
                    <PrioritySelector v-model="editData.priority"></PrioritySelector>
                </template>
            </div>
        </div> 
        <div @click="handleEditMode" class="EditSingleSubTask__subTitle">
            <div class="EditSingleSubTask__subTitlePreview">{{ editData.subTitle }}</div>
            <div class="EditSingleSubTask__subTitleEdit">
                <input class="EditSingleSubTask__subTitleEditInput" v-model="editData.subTitle" />
            </div>
        </div>
        <div class="EditSingleSubTask__notes">
            <textarea class="EditSingleSubTask__notesInput" v-model="editData.notes"></textarea>
        </div>
        <div class="EditSingleSubTask__actions">
            <div class="EditSingleSubTask__btWrap">
            <button class="EditSingleSubTask__bt EditSingleSubTask__btDelete" @click="handleDelete">Delete</button> 
            <button class="EditSingleSubTask__bt EditSingleSubTask__btCancel" @click="$emit('closeEdit')">Cancel</button>
            <button class="EditSingleSubTask__bt EditSingleSubTask__btSave" @click="handleUpdateTask">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from 'vuex'
import PrioritySelector from './PrioritySelector';

export default {
    components: {
        PrioritySelector,
    },

    props: ["task-data"],

    setup(props, context) {
        const store = useStore();
        const editData = ref({
                "title" : props.taskData.title,
                "subTitle" : props.taskData.subTitle,
                "notes": props.taskData.notes,
                "priority": props.taskData.priority,
                "archived": props.taskData.archived,
        });

        function handleDelete() {
            store.commit('removeTask', props.taskData);
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
            console.log(data.newData)
            store.commit('updateTask', data);
            context.emit('closeEdit')
        }

        function handleAddSubTask() {
            context.emit('addSubTask');
        }

        async function handleEditMode(e) {
            const editInput = e.currentTarget.querySelector('input');
            editInput.classList.add('isVisible')
            const handleFocusOut = function() {
                editInput.classList.remove('isVisible');
                editInput.removeEventListener('blur', handleFocusOut);
            }
            editInput.addEventListener('blur', handleFocusOut);
            editInput.focus();
        }

        return {
            handleDelete,
            handleDoneTask,
            handleEditMode,
            editData,
            handleUpdateTask,
            handleAddSubTask,
        }
    }
}
</script>


<style>
.EditSingleSubTask__title {
    padding-right: 20px;
    flex-grow: 1;
}

.EditSingleSubTask {
    background-color: #fff;
    padding: 10px 10px;
}

.EditSingleSubTask__notes {
    margin-top: 15px;
}

.EditSingleSubTask__notesInput {
    resize: none;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px 10px;
}

.EditSingleSubTask__actions {
    margin-top: 10px;
}

.EditSingleSubTask__btWrap {
    display: flex;
    margin: 0 -5px;
    justify-content: flex-end;
}

.EditSingleSubTask__bt {
    display: block;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.EditSingleSubTask__btSave {
    background-color: royalblue;
    color: #fff;
    border: 0;
    box-shadow: none;
    padding: 5px 20px;
}

.EditSingleSubTask__btDelete {
    background-color: transparent;
    color: red;
    border: 0;
    box-shadow: none;
    margin-right: auto;    
}

.EditSingleSubTask__btDelete:hover {
    text-decoration: underline;
}

.EditSingleSubTask__btSave:hover {
    background-color: #3b5fcb;
}

.EditSingleSubTask__btSave:active {
    background-color: #2e4a9e;
}

.EditSingleSubTask__heading {
    display: flex;
}

.EditSingleSubTask__priority {
    padding-top: 8px;
    position: relative;
}

.EditSingleSubTask__priorityLabel {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    transform: translateY(-60%);
}

.EditSingleSubTask__done {
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

.EditSingleSubTask__done:hover {
    border-color: #9FC088;
}

.EditSingleSubTask.isDone .EditSingleSubTask__done {
    background-color: #9FC088;
}

.EditSingleSubTask.isDone .EditSingleSubTask__done::after {
    content: "✓";
    display: block;
    color: #ffffff;
    font-size: 12px;
}

.EditSingleSubTask.isDone .EditSingleSubTask__title {
    text-decoration: line-through;
    opacity: 0.8;
}

.EditSingleSubTask__subTitle {
    position: relative;
    margin-top: 15px;
    padding: 5px 0;
    box-sizing: border-box;
    min-height: 28px;
}

.EditSingleSubTask__subTitle:hover {
    cursor: pointer;
}

.EditSingleSubTask__subTitleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.EditSingleSubTask__subTitleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.EditSingleSubTask__subTitleEditInput.isVisible {
    display: block;
}

.EditSingleSubTask__title {
    position: relative;
    padding: 5px 5px;
    box-sizing: border-box;
    min-height: 28px;
    margin-right: 10px;
    cursor: pointer;
}

.EditSingleSubTask__titleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.EditSingleSubTask__titleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.EditSingleSubTask__titleEditInput.isVisible {
    display: block;
}
</style>