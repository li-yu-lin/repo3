import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager, getConnection } from 'typeorm';
import { Company } from '../entities/company.entity'
import * as crypto from 'crypto-js'

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>) { }
    root(): string {
        return 'Hello World!';
    }
    async create(employee: Employee): Promise<string> {
        let employee = new Employee();
        let company = new Company();
        company.name = 'asc';
        employee.password = crypto.MD5(employee.password).toString();
        employee.company = company;

        console.log(employee.password);

        return this.employeeRepository.save(employee)
    }

    async findOne(name: string): Promise<Employee> {
        return await this.employeeRepository.findOne({ name: name });
    }
}