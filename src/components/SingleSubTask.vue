<template>
    <div class="SingleSubTask" :class="{isDone: taskData.archived, isEditing: taskExpanded}">
        <div class="SingleSubTask__heading" @click="handleExpandTitle">
            <div @click="handleDoneTask" class="SingleSubTask__done"></div>
            <div class="SingleSubTask__title">{{ taskData.title }}</div>
            <div class="SingleSubTask__priority">
                <template v-if="taskData.priority">
                    <div class="SingleSubTask__priorityLabel">Priority:</div>
                    <PrioritySelector :selected-value="taskData.priority"></PrioritySelector>
                </template>
            </div>
        </div> 
        <template v-if="taskExpanded">
            <EditSubTask @closeEdit="taskExpanded = false" :task-data="taskData"></EditSubTask>
        </template>
    </div>
</template>

<script>
import { ref} from "vue";
import { useStore } from 'vuex';
import PrioritySelector from './PrioritySelector';
import EditSubTask from './EditSubTask';

export default {
    components: {
        PrioritySelector,
        EditSubTask,
    },

    props: ["task-data"],

    setup(props) {
        const store = useStore();
        const taskExpanded = ref(false);

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

        return {
            taskExpanded,
            handleExpandTitle,
            handleDoneTask,
        }
    }
}
</script>

<style>
.SingleSubTask.isEditing .SingleSubTask__heading {
    display: none;
}

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

.SingleSubTask__heading {
    display: flex;
}

.SingleSubTask__priority {
    position: relative;
    pointer-events: none;
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

.SingleSubTask__done {
    width: 15px;
    height: 15px;
    border: 1px solid gray;
    border-radius: 50%;
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
</style>