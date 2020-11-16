import { ArgumentMetadata, BadGatewayException, BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

/*
  ! custom pipe example
  - to convert status to uppercase
*/

export class TaskStatusValidationPipe implements PipeTransform {
  // ! Class property
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN
  ]

  transform(value: any) {
    console.log("TaskStatusValidationPipe -> transform -> value", value)
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}