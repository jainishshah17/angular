import { isPresent } from 'angular2/src/facade/lang';
import * as o from '../output/output_ast';
export function getPropertyInView(property, viewPath) {
    if (viewPath.length === 0) {
        return property;
    }
    else {
        var viewProp = o.THIS_EXPR;
        for (var i = 0; i < viewPath.length; i++) {
            viewProp = viewProp.prop('declarationAppElement').prop('parentView');
        }
        if (property instanceof o.ReadPropExpr) {
            var lastView = viewPath[viewPath.length - 1];
            let readPropExpr = property;
            // Note: Don't cast for members of the AppView base class...
            if (lastView.fields.some((field) => field.name == readPropExpr.name) ||
                lastView.getters.some((field) => field.name == readPropExpr.name)) {
                viewProp = viewProp.cast(lastView.classType);
            }
        }
        return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
    }
}
export function injectFromViewParentInjector(token, optional) {
    var args = [createDiTokenExpression(token)];
    if (optional) {
        args.push(o.NULL_EXPR);
    }
    return o.THIS_EXPR.prop('parentInjector').callMethod('get', args);
}
export function getViewFactoryName(component, embeddedTemplateIndex) {
    return `viewFactory_${component.type.name}${embeddedTemplateIndex}`;
}
export function createDiTokenExpression(token) {
    if (isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
export function createFlatArray(expressions) {
    var lastNonArrayExpressions = [];
    var result = o.literalArr([]);
    for (var i = 0; i < expressions.length; i++) {
        var expr = expressions[i];
        if (expr.type instanceof o.ArrayType) {
            if (lastNonArrayExpressions.length > 0) {
                result =
                    result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
                lastNonArrayExpressions = [];
            }
            result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
        }
        else {
            lastNonArrayExpressions.push(expr);
        }
    }
    if (lastNonArrayExpressions.length > 0) {
        result =
            result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtM2pwY0tqSDUudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci92aWV3X2NvbXBpbGVyL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxTQUFTLEVBQVUsTUFBTSwwQkFBMEI7T0FFcEQsS0FBSyxDQUFDLE1BQU0sc0JBQXNCO0FBUXpDLGtDQUFrQyxRQUFzQixFQUFFLFFBQXVCO0lBQy9FLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLElBQUksUUFBUSxHQUFpQixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxZQUFZLEdBQW1CLFFBQVEsQ0FBQztZQUM1Qyw0REFBNEQ7WUFDNUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDO2dCQUNoRSxRQUFRLENB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QWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU07WUFDRixNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc1ByZXNlbnQsIGlzQmxhbmt9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5cbmltcG9ydCAqIGFzIG8gZnJvbSAnLi4vb3V0cHV0L291dHB1dF9hc3QnO1xuaW1wb3J0IHtcbiAgQ29tcGlsZVRva2VuTWV0YWRhdGEsXG4gIENvbXBpbGVEaXJlY3RpdmVNZXRhZGF0YSxcbiAgQ29tcGlsZUlkZW50aWZpZXJNZXRhZGF0YVxufSBmcm9tICcuLi9jb21waWxlX21ldGFkYXRhJztcbmltcG9ydCB7Q29tcGlsZVZpZXd9IGZyb20gJy4vY29tcGlsZV92aWV3JztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb3BlcnR5SW5WaWV3KHByb3BlcnR5OiBvLkV4cHJlc3Npb24sIHZpZXdQYXRoOiBDb21waWxlVmlld1tdKTogby5FeHByZXNzaW9uIHtcbiAgaWYgKHZpZXdQYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgdmlld1Byb3A6IG8uRXhwcmVzc2lvbiA9IG8uVEhJU19FWFBSO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlld1BhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AucHJvcCgnZGVjbGFyYXRpb25BcHBFbGVtZW50JykucHJvcCgncGFyZW50VmlldycpO1xuICAgIH1cbiAgICBpZiAocHJvcGVydHkgaW5zdGFuY2VvZiBvLlJlYWRQcm9wRXhwcikge1xuICAgICAgdmFyIGxhc3RWaWV3ID0gdmlld1BhdGhbdmlld1BhdGgubGVuZ3RoIC0gMV07XG4gICAgICBsZXQgcmVhZFByb3BFeHByOiBvLlJlYWRQcm9wRXhwciA9IHByb3BlcnR5O1xuICAgICAgLy8gTm90ZTogRG9uJ3QgY2FzdCBmb3IgbWVtYmVycyBvZiB0aGUgQXBwVmlldyBiYXNlIGNsYXNzLi4uXG4gICAgICBpZiAobGFzdFZpZXcuZmllbGRzLnNvbWUoKGZpZWxkKSA9PiBmaWVsZC5uYW1lID09IHJlYWRQcm9wRXhwci5uYW1lKSB8fFxuICAgICAgICAgIGxhc3RWaWV3LmdldHRlcnMuc29tZSgoZmllbGQpID0+IGZpZWxkLm5hbWUgPT0gcmVhZFByb3BFeHByLm5hbWUpKSB7XG4gICAgICAgIHZpZXdQcm9wID0gdmlld1Byb3AuY2FzdChsYXN0Vmlldy5jbGFzc1R5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gby5yZXBsYWNlVmFySW5FeHByZXNzaW9uKG8uVEhJU19FWFBSLm5hbWUsIHZpZXdQcm9wLCBwcm9wZXJ0eSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluamVjdEZyb21WaWV3UGFyZW50SW5qZWN0b3IodG9rZW46IENvbXBpbGVUb2tlbk1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uYWw6IGJvb2xlYW4pOiBvLkV4cHJlc3Npb24ge1xuICB2YXIgYXJncyA9IFtjcmVhdGVEaVRva2VuRXhwcmVzc2lvbih0b2tlbildO1xuICBpZiAob3B0aW9uYWwpIHtcbiAgICBhcmdzLnB1c2goby5OVUxMX0VYUFIpO1xuICB9XG4gIHJldHVybiBvLlRISVNfRVhQUi5wcm9wKCdwYXJlbnRJbmplY3RvcicpLmNhbGxNZXRob2QoJ2dldCcsIGFyZ3MpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Vmlld0ZhY3RvcnlOYW1lKGNvbXBvbmVudDogQ29tcGlsZURpcmVjdGl2ZU1ldGFkYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbWJlZGRlZFRlbXBsYXRlSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgdmlld0ZhY3RvcnlfJHtjb21wb25lbnQudHlwZS5uYW1lfSR7ZW1iZWRkZWRUZW1wbGF0ZUluZGV4fWA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZURpVG9rZW5FeHByZXNzaW9uKHRva2VuOiBDb21waWxlVG9rZW5NZXRhZGF0YSk6IG8uRXhwcmVzc2lvbiB7XG4gIGlmIChpc1ByZXNlbnQodG9rZW4udmFsdWUpKSB7XG4gICAgcmV0dXJuIG8ubGl0ZXJhbCh0b2tlbi52YWx1ZSk7XG4gIH0gZWxzZSBpZiAodG9rZW4uaWRlbnRpZmllcklzSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gby5pbXBvcnRFeHByKHRva2VuLmlkZW50aWZpZXIpXG4gICAgICAgIC5pbnN0YW50aWF0ZShbXSwgby5pbXBvcnRUeXBlKHRva2VuLmlkZW50aWZpZXIsIFtdLCBbby5UeXBlTW9kaWZpZXIuQ29uc3RdKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG8uaW1wb3J0RXhwcih0b2tlbi5pZGVudGlmaWVyKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmxhdEFycmF5KGV4cHJlc3Npb25zOiBvLkV4cHJlc3Npb25bXSk6IG8uRXhwcmVzc2lvbiB7XG4gIHZhciBsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucyA9IFtdO1xuICB2YXIgcmVzdWx0OiBvLkV4cHJlc3Npb24gPSBvLmxpdGVyYWxBcnIoW10pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cHJlc3Npb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGV4cHIgPSBleHByZXNzaW9uc1tpXTtcbiAgICBpZiAoZXhwci50eXBlIGluc3RhbmNlb2Ygby5BcnJheVR5cGUpIHtcbiAgICAgIGlmIChsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlc3VsdCA9XG4gICAgICAgICAgICByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtvLmxpdGVyYWxBcnIobGFzdE5vbkFycmF5RXhwcmVzc2lvbnMpXSk7XG4gICAgICAgIGxhc3ROb25BcnJheUV4cHJlc3Npb25zID0gW107XG4gICAgICB9XG4gICAgICByZXN1bHQgPSByZXN1bHQuY2FsbE1ldGhvZChvLkJ1aWx0aW5NZXRob2QuQ29uY2F0QXJyYXksIFtleHByXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhc3ROb25BcnJheUV4cHJlc3Npb25zLnB1c2goZXhwcik7XG4gICAgfVxuICB9XG4gIGlmIChsYXN0Tm9uQXJyYXlFeHByZXNzaW9ucy5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0ID1cbiAgICAgICAgcmVzdWx0LmNhbGxNZXRob2Qoby5CdWlsdGluTWV0aG9kLkNvbmNhdEFycmF5LCBbby5saXRlcmFsQXJyKGxhc3ROb25BcnJheUV4cHJlc3Npb25zKV0pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG4iXX0=