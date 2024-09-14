export function apply<TObject>(instance: TObject, scope: (instance: TObject) => void): TObject {
    scope(instance);
    
    return instance;
}

export function map<TObject, TResult>(instance: TObject, scope: (instance: TObject) => TResult): TResult {
    return scope(instance);
}

// export class Stream<TOperand> {
//     constructor(private readonly operand: TOperand) {}
    
//     apply(scope: (operand: TOperand) => void): Stream<TOperand> {
//         result = scope(this.operand);

//         return this;
//     }

//     map<TResult>(scope: (operand: TOperand) => TResult): Stream<TResult> {
//         return new Stream(scope(this.operand));
//     }


// }