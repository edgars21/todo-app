<template>
    <div class="EditSingleTask" :class="{isDone: taskData.archived}">
        <div class="EditSingleTask__heading">
            <div @click="handleDoneTask" class="EditSingleTask__done"></div>
            <div class="EditSingleTask__title" @click="handleEditMode">
                <div class="EditSingleTask__titlePreview">{{ editData.title }}</div>
                <div class="EditSingleTask__titleEdit">
                    <input class="EditSingleTask__titleEditInput" v-model="editData.title" />
                </div>                    
            </div>
            <div class="EditSingleTask__priority">
                <template v-if="editData.priority">
                    <div class="EditSingleTask__priorityLabel">Priority:</div>
                    <PrioritySelector v-model="editData.priority"></PrioritySelector>
                </template>
            </div>
        </div> 
        <div @click="handleEditMode" class="EditSingleTask__subTitle">
            <div class="EditSingleTask__subTitlePreview">{{ editData.subTitle }}</div>
            <div class="EditSingleTask__subTitleEdit">
                <input class="EditSingleTask__subTitleEditInput" v-model="editData.subTitle" />
            </div>
        </div>
        <div class="EditSingleTask__notes">
            <textarea class="EditSingleTask__notesInput" v-model="editData.notes"></textarea>
        </div>
        <div class="EditSingleTask__subTasks">
            <div class="SubTasks">
                <div v-if="taskData.subtasks && taskData.subtasks.length" class="SubTasks__list">
                    <div v-for="subTask in subTasks" :key="subTask.id" class="SubTasks__editSingleTask">
                        <SingleSubTask :task-data="subTask"></SingleSubTask>
                    </div>    
                </div>
                <button class="SubTasks__addBt" @click="$emit('addSubTask', taskData.id)">Add sub task</button>
            </div>            
        </div>
        <div class="EditSingleTask__actions">
            <div class="EditSingleTask__btWrap">
            <button class="EditSingleTask__bt EditSingleTask__btDelete" @click="handleDelete">Delete</button> 
            <button class="EditSingleTask__bt EditSingleTask__btCancel" @click="$emit('closeEdit')">Cancel</button>
            <button class="EditSingleTask__bt EditSingleTask__btSave" @click="handleUpdateTask">Save</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from 'vuex'
import PrioritySelector from './PrioritySelector';
import SingleSubTask from './SingleSubTask'

export default {
    components: {
        PrioritySelector,
        SingleSubTask
    },

    props: ["task-data"],

    setup(props, context) {
        const store = useStore();
        const allTasks = computed(() => store.state.taskList);
        const subTasks = computed(() => allTasks.value.filter(task => props.taskData.subtasks.includes(task.id)))
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
            store.commit('updateTask', data);
            context.emit('closeEdit')
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
            subTasks,
        }
    }
}
</script>


<style>
.EditSingleTask__title {
    padding-right: 20px;
    flex-grow: 1;
}

.EditSingleTask {
    background-color: #f6f6f6;
    padding: 10px 10px;
}

.EditSingleTask__notes {
    margin-top: 15px;
}

.EditSingleTask__notesInput {
    resize: none;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px 10px;
}

.EditSingleTask__actions {
    margin-top: 10px;
}

.EditSingleTask__btWrap {
    display: flex;
    margin: 0 -5px;
    justify-content: flex-end;
}

.EditSingleTask__bt {
    display: block;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
}

.EditSingleTask__btSave {
    background-color: royalblue;
    color: #fff;
    border: 0;
    box-shadow: none;
    padding: 5px 20px;
}

.EditSingleTask__btDelete {
    background-color: transparent;
    color: red;
    border: 0;
    box-shadow: none;
    margin-right: auto;    
}

.EditSingleTask__btDelete:hover {
    text-decoration: underline;
}

.EditSingleTask__btSave:hover {
    background-color: #3b5fcb;
}

.EditSingleTask__btSave:active {
    background-color: #2e4a9e;
}

.EditSingleTask__heading {
    display: flex;
}

.EditSingleTask__priority {
    padding-top: 8px;
    position: relative;
}

.EditSingleTask__priorityLabel {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 12px;
    font-weight: 700;
    transform: translateY(-60%);
}

.EditSingleTask__done {
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

.EditSingleTask__done:hover {
    border-color: #9FC088;
}

.EditSingleTask.isDone .EditSingleTask__done {
    background-color: #9FC088;
}

.EditSingleTask.isDone .EditSingleTask__done::after {
    content: "✓";
    display: block;
    color: #ffffff;
    font-size: 12px;
}

.EditSingleTask.isDone .EditSingleTask__title {
    text-decoration: line-through;
    opacity: 0.8;
}

.EditSingleTask__subTitle {
    position: relative;
    margin-top: 15px;
    padding: 5px 0;
    box-sizing: border-box;
    min-height: 28px;
}

.EditSingleTask__subTitle:hover {
    cursor: pointer;
}

.EditSingleTask__subTitleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.EditSingleTask__subTitleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.EditSingleTask__subTitleEditInput.isVisible {
    display: block;
}

.EditSingleTask__title {
    position: relative;
    padding: 5px 0;
    box-sizing: border-box;
    min-height: 28px;
    margin-right: 10px;
    cursor: pointer;
}

.EditSingleTask__titleEdit {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

.EditSingleTask__titleEditInput {
    display: none;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 5px 5px;
}

.EditSingleTask__titleEditInput.isVisible {
    display: block;
}

.SubTasks__list {
    margin: 20px 0;
}

.SubTasks__editSingleTask:not(:last-child) {
  border-bottom: 1px solid #D3D3D3;
}
</style>