package com.example.springonlinecard.dao.domain;

public enum Status {

    PROCESS(0),READY(1),CANCEL(2);
    private int value;

    Status(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
