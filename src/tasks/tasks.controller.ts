import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service'

@Controller('tasks') // Decorator
@UseGuards(AuthGuard()) // Check token before execute TasksController
export class TasksController {
  private logger = new Logger('TasksController')
  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe) // ! Pipe validation
  getTasks(
    @Query() filterDto: GetTasksFilterDto, // query ===> /tasks?search=semeru
    @GetUser() user: User
    ) {

    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ): Promise<Task> {  /* : Promise<Task> -> return promiese Task entity */
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe) // ! Pipe validation
  createTask(
    // @Body() body
    /*
    Destructuring example with body decorator
    @Body('title') title: string,
    @Body('description') description: string,

    DTO sebagai format object yang mengecek object yg dikirim dari clint
    */
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Patch('/:id/status')
  updateTaskStatusById(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ValidationPipe) status: TaskStatus,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatusById(id, status, user);

  }

  @Delete('/:id')
  deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User
    ): Promise<void> {
    return this.tasksService.deleteTask(id, user)
  }
}
